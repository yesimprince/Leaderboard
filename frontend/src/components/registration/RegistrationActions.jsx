export default function RegistrationActions({ isLoading }) {
  return (
    <div className="
      flex flex-col
      gap-3
      pt-4
    ">

      <button
        type="submit"
        disabled={isLoading}
        className={`
          h-12
          rounded-xl
          bg-yellow-500
          text-black
          font-bold
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? 'Registering...' : 'Submit Registration'}
      </button>

      <button 
        type="button"
        className="
          h-12
          rounded-xl
          border border-white/10
        "
      >
        Cancel
      </button>

    </div>
  );
}