type CreateUserProps = {
  Create: React.FormEventHandler<HTMLFormElement>;
  role: string | undefined;
  createMsg: string | null;
};

function CreateUser({ Create, role, createMsg }: CreateUserProps) {
  return (
    <form action="#" onSubmit={Create}>
      <h5 className="text-xl font-semibold text-heading mb-6">
        Create a New {role}.
      </h5>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="example@company.com"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your username
        </label>
        <input
          type="username"
          id="username"
          name="username"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="username"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="************"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
      {createMsg && <p>{createMsg}</p>}
    </form>
  );
}

export default CreateUser;
