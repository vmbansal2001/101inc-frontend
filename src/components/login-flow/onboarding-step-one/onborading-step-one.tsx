import { AuthUser } from "@/src/store/slices/auth-state-slice/auth-state-slice-types";
import { HardHat, User, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../buttons/common-button";
import useUserData from "../../use-user-data/use-user-data";
import ServiceType from "@/src/types/service-type/ServiceType";
import { useGetServiceTypesQuery } from "@/src/services/service-types/service-types.query";

type StepOneFormData = {
  name: string;
  phone: string;
  role: string;
  mechanicServices: number[];
};

type Props = {
  currentUser: AuthUser;
};

const OnboardingStepOne = ({ currentUser }: Props) => {
  const { data: mechanicServices } = useGetServiceTypesQuery();

  const [formData, setFormData] = useState<StepOneFormData>({
    name: "",
    phone: "",
    role: "",
    mechanicServices: [],
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    role: "",
    mechanicServices: "",
  });

  const [buttonLoading, setButtonLoading] = useState(false);

  const { updateUserData } = useUserData();

  // useEffect(() => {
  //   console.log("Calling fetchMechanicServices");
  //   const fetchMechanicServices = async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/service_types/`
  //     );
  //     const data = await response.json();
  //     setMechanicServices(data);
  //   };
  //   fetchMechanicServices();
  // }, []);

  const clearFormErrors = () => {
    setFormErrors({
      name: "",
      phone: "",
      role: "",
      mechanicServices: "",
    });
  };

  const handleFormSubmit = async () => {
    clearFormErrors();

    if (!formData.name) {
      setFormErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }

    if (!formData.phone) {
      setFormErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
      return;
    }

    if (!formData.role) {
      setFormErrors((prev) => ({ ...prev, role: "Role is required" }));
      return;
    }

    if (
      formData.role === "MECHANIC" &&
      formData.mechanicServices.length === 0
    ) {
      setFormErrors((prev) => ({
        ...prev,
        mechanicServices: "At least one service is required",
      }));
      return;
    }

    setButtonLoading(true);

    const updationPayloadBody = {
      full_name: formData.name,
      phone: formData.phone,
      role: formData.role,
      email: currentUser.email,
      ...(formData.role === "MECHANIC" && {
        service_type_ids: formData.mechanicServices,
      }),
    };

    await updateUserData(updationPayloadBody);
  };

  const handleServiceSelection = (serviceId: number) => {
    if (formData.mechanicServices.includes(serviceId)) {
      setFormData({
        ...formData,
        mechanicServices: formData.mechanicServices.filter(
          (id) => id !== serviceId
        ),
      });
    } else {
      setFormData({
        ...formData,
        mechanicServices: [...formData.mechanicServices, serviceId],
      });
    }
  };

  return (
    <div className="w-fit z-10 rounded-2xl shadow-xl border-2 border-red-800/30 p-5 flex flex-col gap-8 items-center bg-white backdrop-blur-sm max-h-[90vh] overflow-y-auto">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-red-600 rounded-full p-5 text-white mb-2 shadow-lg">
          <Wrench size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          101 Inc
        </h1>
        <p className="text-sm text-gray-600 font-medium">
          Auto & Home Services
        </p>
      </div>

      <div className="w-[350px] space-y-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-[#0a0a0a]"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            className="bg-[#f3f3f5] rounded-md py-2 px-3 text-sm placeholder:text-[#717182] placeholder:font-medium"
            placeholder="Enter your full name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {formErrors.name && (
            <p className="text-xs text-red-500 -mt-1">{formErrors.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-[#0a0a0a]"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            className="bg-[#f3f3f5] rounded-md py-2 px-3 text-sm placeholder:text-[#717182] placeholder:font-medium"
            placeholder="Enter your phone number"
            onChange={(e) => {
              const value = e.target.value;

              setFormData({ ...formData, phone: value });
            }}
          />

          {formErrors.phone && (
            <p className="text-xs text-red-500 -mt-1">{formErrors.phone}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-semibold text-[#0a0a0a]">Role</p>

          <div className="flex gap-2">
            <button
              className={`flex flex-col gap-1 w-full items-center justify-center bg-[#f3f3f5] rounded-md py-2 px-3 text-sm placeholder:text-[#717182] placeholder:font-medium ${
                formData.role === "CUSTOMER" ? "bg-blue-500 text-white" : ""
              } transition-all duration-200 cursor-pointer`}
              onClick={() => setFormData({ ...formData, role: "CUSTOMER" })}
            >
              <User />
              <p className="text-xs font-medium">Customer</p>
            </button>
            <button
              className={`flex flex-col gap-1 w-full items-center justify-center bg-[#f3f3f5] rounded-md py-2 px-3 text-sm placeholder:text-[#717182] placeholder:font-medium ${
                formData.role === "MECHANIC" ? "bg-blue-500 text-white" : ""
              } transition-all duration-200 cursor-pointer`}
              onClick={() => setFormData({ ...formData, role: "MECHANIC" })}
            >
              <HardHat />
              <p className="text-xs font-medium">Mechanic</p>
            </button>
          </div>

          {formErrors.role && (
            <p className="text-xs text-red-500 -mt-1">{formErrors.role}</p>
          )}
        </div>

        {formData.role === "MECHANIC" && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[#0a0a0a]">
              Services you offer
            </p>
            <div className="grid grid-cols-1 gap-2">
              {mechanicServices?.map((service) => (
                <button
                  key={service.id}
                  className={`w-full rounded-md py-2 px-3 text-sm text-left border hover:shadow-md transition-all duration-200 cursor-pointer ${
                    formData.mechanicServices.includes(service.id)
                      ? "border-blue-700 bg-blue-50"
                      : "border-gray-200 bg-white"
                  } transition-all duration-200 cursor-pointer`}
                  onClick={() => handleServiceSelection(service.id)}
                >
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-gray-500">{service.description}</p>
                </button>
              ))}
            </div>

            {formErrors.mechanicServices && (
              <p className="text-xs text-red-500 -mt-1">
                {formErrors.mechanicServices}
              </p>
            )}
          </div>
        )}

        <Button
          onClick={() => handleFormSubmit()}
          loading={buttonLoading}
          loaderColor="#fff"
          className="w-full bg-black text-white py-2 rounded-md shadow-md hover:shadow-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer px-10"
        >
          Continue &rarr;
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStepOne;
