// External
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";

// Internal
import User from "../models/Users";
import { useGetUser } from "../hooks/useGetUser";
import updateUser from "../apis/updateUser";

const EditUserForm = () => {
  const { id } = useParams();
  const { data: user } = useGetUser(id as string);
  const navigate = useNavigate();

  const mutation = useMutation(
    ({ id, userData }: { id: string; userData: Partial<User> }) =>
      updateUser(id, userData as BodyInit),
  );
  return (
    <>
      {id && (
        <div className="p-4">
          <Formik
            enableReinitialize
            initialValues={user}
            onSubmit={(values: Partial<User>, { setSubmitting }) => {
              mutation &&
                mutation.mutate(
                  { id: id as string, userData: values },
                  {
                    onSuccess: () => {
                      setSubmitting(false);
                    },
                  },
                );
              navigate("/users");
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="username"
                    className="input border-gray-300 rounded p-2 w-full"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    type="email"
                    className="input border-gray-300 rounded p-2 w-full"
                    placeholder="Email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default EditUserForm;
