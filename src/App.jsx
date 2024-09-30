import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { addScheduleTimes } from './utilities/time';

const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const response = await fetch(url);
  try {
    const res = await response.json();
    console.log(res);
    return addScheduleTimes(res);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

const Main = () =>  {
  const {isPending, error, data:schedule } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });
  
  if (error) return <h1>{error}</h1>;
  if (isPending) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;