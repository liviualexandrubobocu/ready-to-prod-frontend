// External
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Internal
import User from "../models/Users";
import createUser from "../apis/createUser";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation((newUser: Partial<User>) =>
    createUser(newUser as BodyInit),
  );
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <Formik
        initialValues={{ username: "", email: "" }}
        onSubmit={(values: Partial<User>, { setSubmitting }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              setSubmitting(false);
            },
          });
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
              {t("create")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserForm;
