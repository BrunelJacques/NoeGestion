// src/ap_stocks/constants/services.ts

interface Service {
  id: number;
  code: string;
  libelle: string;
}

export const  Services: Service[] = [
    { id: 0, code: '-',  libelle: '' },
    { id: 1, code: 'matin', libelle: '1 Service du matin' },
    { id: 2, code: 'midi', libelle: '2 Service de midi' },
    { id: 3, code: 'soir', libelle: '3 Service du soir' },
    { id: 4, code: '5eme', libelle: '4 5eme repas' },
    { id: 5, code: 'tous', libelle: '5 Tout service' },
  ]



