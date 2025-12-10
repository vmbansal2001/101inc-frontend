"use client";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Value, isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";

import baseApi from "@/src/services/base-api";
import {
  usePostInventoryGarageMutation,
  usePostInventoryGarageUserMutation,
} from "@/src/services/inventory/inventory.query";
import {
  useLazyGetUserByPhoneQuery,
  usePostUserDataMutation,
} from "@/src/services/users/users.query";
import { useAppDispatch } from "@/src/store/hooks";
import GarageTypeToggle, { GarageType } from "./garage-type-toggle";
import PhoneNumberField from "./phone-number-field";

const AddNewGarage = () => {
  const dispatch = useAppDispatch();

  const [garageType, setGarageType] = useState<GarageType>(null);
  const [garageName, setGarageName] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [phone, setPhone] = useState<Value | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [getUserByPhone] = useLazyGetUserByPhoneQuery();
  const [createUser] = usePostUserDataMutation();
  const [createGarage] = usePostInventoryGarageMutation();
  const [assignGarageUser] = usePostInventoryGarageUserMutation();

  const normalizedPhone = useMemo(() => (phone ? `${phone}` : ""), [phone]);

  const isPhoneValid = useMemo(() => {
    if (!phone) return false;
    try {
      return isValidPhoneNumber(phone);
    } catch {
      return false;
    }
  }, [phone]);

  const derivedGarageName = useMemo(() => {
    if (!garageType) return "";
    return garageType === "Private" ? operatorName : garageName;
  }, [garageName, garageType, operatorName]);

  const canSubmit =
    Boolean(garageType) &&
    Boolean(operatorName.trim()) &&
    Boolean(derivedGarageName) &&
    isPhoneValid &&
    !isSubmitting;

  const resetForm = () => {
    setGarageType(null);
    setGarageName("");
    setOperatorName("");
    setPhone(undefined);
  };

  const resolveUserId = useCallback(
    async (fullName: string, phoneNumber: string) => {
      const lookup = await getUserByPhone({ phone: phoneNumber });

      // User exists: return their ID
      if (lookup.data && lookup.data.id) {
        return lookup.data.id;
      }

      // User doesn't exist: 404 error OR null data (API might return 200 OK with null)
      const isUserNotFound =
        (lookup.error &&
          "status" in lookup.error &&
          lookup.error.status === 404) ||
        (!lookup.data && !lookup.error);

      if (isUserNotFound) {
        const created = await createUser({
          body: { full_name: fullName, phone: phoneNumber, role: "OPERATOR" },
        }).unwrap();

        const createdId = created?.id;
        if (!createdId) {
          throw new Error("User was created but id is missing.");
        }
        return createdId as number;
      }

      // Any other error: surface it
      if (lookup.error) {
        const apiMessage =
          (lookup.error as any)?.data?.message ||
          "Unable to look up user by phone.";
        throw new Error(apiMessage);
      }

      // Fallback: shouldn't reach here, but handle gracefully
      throw new Error(
        "Unexpected response: user lookup returned no data and no error."
      );
    },
    [createUser, getUserByPhone]
  );

  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault();
      setError(null);

      if (!garageType) {
        setError("Select a garage type.");
        return;
      }

      if (!operatorName.trim()) {
        setError("Operator full name is required.");
        return;
      }

      if (!derivedGarageName) {
        setError("Garage name is required.");
        return;
      }

      if (!normalizedPhone || !isPhoneValid) {
        setError("Enter a valid phone number with country code.");
        return;
      }

      setIsSubmitting(true);

      try {
        const userId = await resolveUserId(operatorName, normalizedPhone);

        const createdGarage = await createGarage({
          body: {
            phone: normalizedPhone,
            name: derivedGarageName,
            type: garageType,
          },
        }).unwrap();

        const garageId = (createdGarage as any)?.id;
        if (!garageId) {
          throw new Error("Garage was created but id is missing.");
        }

        await assignGarageUser({
          garageId,
          body: { user_id: userId },
        }).unwrap();

        dispatch(baseApi.util.invalidateTags(["InventoryGarage"]));
        toast.success("Garage created and operator assigned.");
        resetForm();
      } catch (err: any) {
        const message =
          err?.message ||
          err?.data?.message ||
          "Unable to create garage. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      assignGarageUser,
      createGarage,
      derivedGarageName,
      dispatch,
      garageType,
      isPhoneValid,
      normalizedPhone,
      operatorName,
      resolveUserId,
    ]
  );

  return (
    <section className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Garage
          </h2>
          <p className="text-sm text-gray-600">
            Create a garage and assign an operator in one flow.
          </p>
        </div>
        <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Uses phone to verify user
        </div>
      </div>

      <form
        className="p-5 space-y-6"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <GarageTypeToggle value={garageType} onChange={setGarageType} />

        <div className="flex flex-col gap-4">
          {garageType !== "Private" && (
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Garage name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="garageName"
                value={derivedGarageName}
                onChange={(e) => setGarageName(e.target.value)}
                placeholder="e.g., Main Street Garage"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Operator full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="operatorName"
              value={operatorName}
              onChange={(e) => setOperatorName(e.target.value)}
              placeholder="e.g., Priya Sharma"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
            />
          </div>

          <div>
            <PhoneNumberField
              value={phone}
              onChange={setPhone}
              required
              helperText="We will check if this number already exists."
              error={
                phone && !isPhoneValid
                  ? "Please enter a valid number with country code."
                  : null
              }
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:shadow-none"
          >
            {isSubmitting ? "Saving..." : "Create garage & assign operator"}
          </button>
          <p className="text-xs text-gray-600 pt-2">
            We will look up the phone, create the user if missing, create the
            garage, then assign the operator.
          </p>
        </div>
      </form>
    </section>
  );
};

export default AddNewGarage;
