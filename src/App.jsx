import Slider from "./components/slider/Slider";

function App() {
  const slidesInfo = [
    {
      title: "Tienes hasta 30% dscto. en DGO Full",
      description:
        "Lo mejor del streaming y TV por 6 meses con tus Tarjetas Interbank.",
      textButton: "Conoce Mas",
    },
    {
      title: "Descubre el MegaSale de Shopstar",
      description:
        "Dsctos únicos en todas las categorías con tus Tarjetas Interbank",
      textButton: "Ver Mas",
    },
  ];
  return (
    <>
      <Slider slidesInfo={slidesInfo} />
    </>
  );
}

export default App;
