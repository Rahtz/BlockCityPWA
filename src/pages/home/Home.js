import ClubLeaders from "./components/ClubLeaders";
import ArticleCarousel from "./components/ArticleCarousel";
import LatestNews from "./components/LatestNews";
import RecentGames from "./components/RecentGames";

const Home2 = () => {

  return (
    <div className='bg-gray-50'>
      <div className="h-[150px] w-full bg-gray-50">
        <RecentGames />
      </div>

      <div className="flex lg:flex-row items-center flex-col lg:h-[600px] h-auto w-full bg-gray-50">
        <ArticleCarousel />
        <LatestNews />
      </div>
      

      <div className="w-auto h-[600px] lg:mt-0 overflow-x-auto">
  <div className="bg-gray-50">
    <h1 className="text-3xl pl-[5%] pb-[25px]">Club Leaders</h1>
    <div className="flex space-x-6 pl-[5%]">
      <div className='w-[400px]'>
        <h1 className='lg:w-1/5'>Points</h1>
        <ClubLeaders statisticType="points" />
      </div>
      <div className='w-[400px]'>
        <h1 className='lg:w-1/5'>Assists</h1>
        <ClubLeaders statisticType="assists" />
      </div>
      <div className='w-[400px]'>
        <h1 className='lg:w-1/5'>Rebounds</h1>
        <ClubLeaders statisticType="rebounds" />
      </div>
      <div className='w-[400px]'>
        <h1 className='lg:w-1/5'>Steals</h1>
        <ClubLeaders statisticType="steals" />
      </div>
      <div className='w-[400px]'>
        <h1 className='lg:w-1/5'>Blocks</h1>
        <ClubLeaders statisticType="blocks" />
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Home2;
