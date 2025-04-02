import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to **DriveLetter**. Your privacy is important to us. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our web application. By using
            **DriveLetter**, you agree to the collection and use of information
            in accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <p>
            We collect certain personal information when you use
            **DriveLetter**. This includes:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Your Google account information (for authentication purposes).
            </li>
            <li>
              Documents you create or save using **DriveLetter**, which are
              stored in your Google Drive.
            </li>
            <li>
              Any other data you provide while interacting with the app, such as
              preferences or feedback.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            3. How We Use Your Information
          </h2>
          <p>The information we collect is used for the following purposes:</p>
          <ul className="list-disc pl-6">
            <li>To provide, operate, and maintain **DriveLetter** services.</li>
            <li>
              To authenticate users and ensure secure access to your Google
              account.
            </li>
            <li>To allow users to save documents to their Google Drive.</li>
            <li>
              To improve the performance and functionality of **DriveLetter**.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            4. Sharing Your Information
          </h2>
          <p>
            We do not share your personal information with third parties except
            in the following circumstances:
          </p>
          <ul className="list-disc pl-6">
            <li>When required by law or legal process.</li>
            <li>
              With third-party service providers who assist us in operating the
              app (e.g., Google APIs).
            </li>
            <li>
              If we believe it is necessary to protect our rights, property, or
              safety, or the rights, property, or safety of others.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            5. Google Drive Integration
          </h2>
          <p>
            **DriveLetter** integrates with Google Drive to save your documents.
            By using **DriveLetter**, you give us permission to create, read,
            and modify documents on your Google Drive through the Google Drive
            API.
          </p>
          <p>
            We do not store your documents on our servers; all documents are
            stored securely in your Google Drive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6. Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information and
            documents. However, no method of transmission over the internet or
            electronic storage is 100% secure, so we cannot guarantee its
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6">
            <li>Access, update, or delete your personal information.</li>
            <li>
              Request a copy of the documents stored in your Google Drive that
              are associated with **DriveLetter**.
            </li>
            <li>
              Withdraw your consent to use the app at any time by disconnecting
              your Google account.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by updating the date at the top of
            this page. You are encouraged to review this Privacy Policy
            periodically for any changes.
          </p>
        </section>

        <div className="text-center mt-6">
          <p>Last updated: April 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
