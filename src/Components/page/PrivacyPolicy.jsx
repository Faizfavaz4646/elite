import React from 'react';

const PrivacyPolicy = () => {
      const currentDate = new Date().toLocaleDateString();
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 text-gray-800 mt-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900">Privacy Policy</h1>

      <p className="text-sm text-gray-500 mb-4 text-center">Last Updated: {currentDate}</p>

      <p className="mb-6 text-base leading-relaxed">
        Welcome to <strong>Elite Eleven</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <p className="mb-2">We collect the following types of information when you interact with our site:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong>Personal Information</strong> – Name, email, address, phone, and payment details.</li>
          <li><strong>Non-Personal Information</strong> – Browser type, device info, IP, pages visited.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>To process and fulfill your orders</li>
          <li>To personalize your shopping experience</li>
          <li>To communicate order updates or offers</li>
          <li>To prevent fraud and improve our services</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How We Share Your Information</h2>
        <p className="mb-2">We do <strong>not sell</strong> your data. We may share it with trusted services to:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Process payments securely</li>
          <li>Ship your orders through delivery partners</li>
          <li>Send marketing emails (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="mb-2">We use SSL encryption and secure authentication to protect your data. While no method is 100% secure, we prioritize your data privacy and work continuously to safeguard it.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
        <p className="mb-2">We use cookies to enhance user experience. You may disable them in your browser, but some site features may not function properly.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Access, update, or delete your data</li>
          <li>Delete your account permanently</li>
          <li>Unsubscribe from promotional content</li>
        </ul>
        <p className="mt-2">To exercise your rights, email us at <strong>support@eliteeleven.in</strong>.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
        <p>Our site may contain links to other websites. We are not responsible for their privacy practices.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Policy Updates</h2>
        <p>We may update this policy. Major changes will be notified on our site or via email.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>If you have questions, reach out to:</p>
        <ul className="list-inside mt-2 space-y-1 ml-4">
          <li>📧 <strong>Email:</strong> support@eliteeleven.in</li>
          <li>📍 <strong>Address:</strong> Elite Eleven, Calicut, Kerala, India</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
