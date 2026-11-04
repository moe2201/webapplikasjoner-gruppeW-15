import { ServiceCard, type Service } from "./ServiceCard";

const services: Service[] = [
  {
    id: "logo-design",
    name: "Logo Design",
    description: "Profesjonell logo designet for din bedrift.",
    price: 1500,
    durationMinutes: 60,
    icon: "",
  },
  {
    id: "nettside",
    name: "Nettside",
    description: "Moderne og rask nettside tilpasset dine behov.",
    price: 5000,
    durationMinutes: 120,
    icon: "",
  },
  {
    id: "app-utvikling",
    name: "App Utvikling",
    description: "iOS og Android app utviklet fra bunnen av.",
    price: 15000,
    durationMinutes: 180,
    icon: "",
  },
  {
    id: "fotografering",
    name: "Fotografering",
    description: "Profesjonelle bilder til bedrift eller privat bruk.",
    price: 2000,
    durationMinutes: 90,
    icon: "",
  },
  {
    id: "It-Konsulent",
    name: "It Rådgiver & Support",
    description: "Teknisk veiledning, feilsøking og arkitekturstøtte for dine digitale prosjekter.",
    price: 1200,
    durationMinutes: 60,
    icon: "",
  },
  {
    id: "Barber",
    name: "Barber",
    description: "Profesjonell barbering og hårstyling.",
    price: 500,
    durationMinutes: 30,
    icon: "",
  },
  {
    id: "Makeup",
    name: "Makeup",
    description: "Profesjonell makeup for alle anledninger.",
    price: 800,
    durationMinutes: 45,
    icon: "",
  },
  {
    id:"Agency",
    name: "Agency",
    description: "Full-service digitalt byrå som tilbyr alt fra strategi til implementering.",
    price: 10000,
    durationMinutes: 240,
    icon: "",
  }
];

export function ServiceList() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}