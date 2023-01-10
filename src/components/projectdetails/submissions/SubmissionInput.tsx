import TextInputField from '../../base/input/TextInputField';
import Loader from '../../base/Loader';

interface SubmissionInputProps {
  link: string;
  setLink(v: string): void;
  submitHandler(): void;
  loading: boolean;
}

export default function SubmissionInput({
  link,
  setLink,
  submitHandler,
  loading,
}: SubmissionInputProps) {
  return (
    <div className={`flex space-x-2 ${loading ? 'pointer-events-none' : ''}`}>
      <TextInputField
        className="flex-1"
        placeholder="Working on this project? Enter the link here."
        value={link}
        onValueChange={(v) => setLink(v)}
      />
      {loading ? (
        <Loader small />
      ) : (
        <button
          className="submit-button-s"
          type="button"
          onClick={submitHandler}
        >
          Add
        </button>
      )}
    </div>
  );
}
