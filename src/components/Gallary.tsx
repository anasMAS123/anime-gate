const Gallary = () => {
  return (
    <div className="flex justify-between bg-[var(--main-color)] p-4 rounded-xl">
      <div className="flex flex-col gap-4">
        <img src="./figure.jpg" alt="figure" width={250} height={250} />
        <img src="figure_2.webp" alt="figure_2" width={250} height={250} />
      </div>

      <img src="./main_pic.jpeg" alt="main_pic" width={500} height={500} />
    </div>
  );
};

export default Gallary;
