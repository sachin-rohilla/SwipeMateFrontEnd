import ImageCarousel from "../components/ui/ImageCarousel";

const Home = () => {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <ImageCarousel
        items={[
          {
            id: 1,
            image:
              "https://plus.unsplash.com/premium_photo-1718204436526-277f9f34607c?q=80&w=1818&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Item 1",
          },
          {
            id: 2,
            image:
              "https://images.unsplash.com/photo-1718717722247-26f4c6c09192?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
            title: "Item 2",
          },
          {
            id: 3,
            image:
              "https://plus.unsplash.com/premium_photo-1718570262641-54c3ea3142e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Item 3",
          },
          {
            id: 4,
            image:
              "https://images.unsplash.com/photo-1718524767488-10ee93e05e9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Item 4",
          },
          {
            id: 5,
            image:
              "https://images.unsplash.com/photo-1718524767488-10ee93e05e9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Item 4",
          },
        ]}
      />
    </div>
  );
};

export default Home;
