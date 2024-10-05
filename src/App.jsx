import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import EditForm from './components/EditForm';
import { useData } from './utilities/firebase.js';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
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
  // const {isFetching:isPending, error, data:schedule } = useQuery({
  //   queryKey: ['schedule'],
  //   queryFn: fetchSchedule
  // });
  const [schedule, error] = useData('/', addScheduleTimes);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (schedule === undefined) return <h1>Loading data...</h1>;
  if (!schedule) return <h1>No data found</h1>;

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <Router>
        <Routes>
          <Route path="/" element={<CourseList courses={ schedule.courses } />} />
          <Route path="/edit" element={<EditForm />} />
        </Routes>
      </Router>
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