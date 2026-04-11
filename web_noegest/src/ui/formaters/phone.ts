// src/ui/formateurs/phone.ts

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};


// non implémenté, gardé pour le futur 
export const formatInternationalPhone = (value: string): string => {
  let digits = value.replace(/[^\d+]/g, "");

  // Garde le + uniquement en début
  if (digits.includes("+")) {
    digits = "+" + digits.replace(/\+/g, "");
  }

  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};

