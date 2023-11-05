import { useEffect, useState } from "react";
import { supabase } from "../../../services/client";
import { Carousel } from "react-responsive-carousel";

const ArticleCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetchPictures();
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("heading, body, picture_id")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      if (data) {
        setArticles(data);
      }
    }
  }

  async function fetchPictures() {
    const { data } = await supabase.from("pictures").select();
    setPictures(data);
  }

  var picture_url = pictures.reduce(function (result, currentObject) {
    result[currentObject.id] = currentObject.picture_url;
    return result;
  }, {});

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current slide index to switch to the next item
      setCurrentSlide((prevSlide) => (prevSlide + 1) % articles.length);
    }, 5000); // Change the interval duration as needed (in milliseconds)

    return () => {
      clearInterval(interval); // Clear the interval to stop the automatic switching when the component unmounts
    };
  }, [articles.length]);

  return (
    <div className="lg:h-[550px] lg:9/12 w-11/12 h-auto">
      <Carousel
        showThumbs={false}
        dynamicHeight={true}
        showStatus={false}
        showArrows={false}
        thumbPosition="bottom"
        selectedItem={currentSlide}
        autoPlay={true}
        interval={10000}
      >
        {articles.map((article, index) => (
          <div>
            <div
              key={index}
              className="lg:hidden block h-full w-full relative rounded-xl" // Add 'relative' class for positioning
            >
              <img
                className="w-full h-[350px] rounded-xl"
                src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                  picture_url[article.picture_id]
                }`}
                alt="Article Image"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-end p-4 text-white bg-black bg-opacity-30 rounded-xl">
                <h1 className="text-2xl font-bold">{article.heading}</h1>
                <button className="w-[130px] border-[2px] border-orange-500 rounded-2xl p-1 mt-2 mb-[10%]">
                  Read More
                </button>
              </div>
            </div>

            <div
              key={index}
              className="hidden lg:flex flex-row pl-10 bg-white rounded-xl -mt-20"
            >
              <div className="w-full lg:w-7/12 py-20 flex lg:flex-col lg:order-1 lg:px-5">
                <h2 className="font-bold lg:text-5xl text-2xl lg:pb-5 -mb-[60px] lg:mb-0">
                  {article.heading}
                </h2>
                <p className="hidden lg:block">
                  {article.body.slice(0, 200)}...
                </p>
                <button className="w-[150px] mt-10 p-2 border-[2px] lg:ml-[200px] border-orange-500 rounded-2xl bg-transparent text-black hover:bg-orange-500 hover:text-white">
                  Read More
                </button>
              </div>
              <div className="w-full lg:w-5/12 flex lg:order-2">
                <img
                  className="h-[500px] w-[500px] rounded-xl"
                  src={`https://kztusjtvdmyslpoycgad.supabase.co/storage/v1/object/public/images/public/${
                    picture_url[article.picture_id]
                  }`}
                  alt="Article Image"
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ArticleCarousel;
