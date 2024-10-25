import './App.css';
import CandidateForm from './components/CandidateForm';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Candidate Document Submission
        </h1>
        <CandidateForm />
      </div>
    </div>
  );
};

export default App;
