import React from "react";

const TermOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center  mb-6">
        Terms of Service
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold ">1. Introduction</h2>
          <p className="m-5">App or We refers to - DriveLetter App</p>
          <p>
            Welcome to our web application ("App"). By using our services, you
            agree to these Terms of Service. If you do not agree with any of
            these terms, please refrain from using our app. These Terms govern
            your access to and use of the services provided by us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold ">2. User Authentication</h2>
          <p>
            To use the app, you must sign in using your Google account. We
            utilize Google OAuth to authenticate users. By signing in, you grant
            us permission to access your Google account information in
            accordance with the Google Privacy Policy and OAuth permissions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold ">3. User Data and Privacy</h2>
          <p>
            We collect certain personal data for the purpose of providing our
            services, including your Google account details. We respect your
            privacy and will not share or sell your personal information to
            third parties. We do not store your documents on our servers; your
            documents are stored securely on Google Drive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold ">
            4. Use of Google Drive API
          </h2>
          <p>
            Our app uses Google Drive API to store your documents. By using this
            service, you authorize us to create, update, and manage documents on
            your behalf in your Google Drive account. You are responsible for
            ensuring that you have the necessary permissions to authorize these
            actions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold ">5. User Responsibilities</h2>
          <p>
            As a user, you agree not to use the app for any unlawful purposes,
            including but not limited to violating copyright laws, uploading
            malicious content, or engaging in any activity that disrupts or
            damages the app's functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold ">
            6. Limitation of Liability
          </h2>
          <p>
            We are not responsible for any loss of data or damages resulting
            from the use of our app or third-party services, including Google
            Drive. We make no warranties regarding the availability, accuracy,
            or reliability of the app.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold ">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the app
            at any time if you violate these Terms of Service or engage in
            harmful activities. Upon termination, all access to your documents
            will cease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold ">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify or update these Terms of Service at
            any time. We will notify you of any material changes, and your
            continued use of the app after such modifications constitutes your
            acceptance of the revised terms.
          </p>
        </section>

        <div className="text-center mt-6">
          <p>Last updated: April 2025</p>
        </div>
      </div>
    </div>
  );
};

export default TermOfService;
