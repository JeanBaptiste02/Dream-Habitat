import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import {
  MdFacebook,
  MdShare,
  MdOutlineWhatsapp,
  MdOutlineAlternateEmail
} from 'react-icons/md';

const Contact = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.sendForm(
        'service_73pkxui',
        'template_cze6ksj',
        form.current,
        '7Mfm5TWuLMZJmNJBG'
      );

      if (result.text === 'OK') {
        setStatus({
          type: 'success',
          message: 'Message envoyé avec succès! Nous vous répondrons bientôt.'
        });
        form.current.reset();
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'envoi du message.' // Correction ici
      });
    } finally {
      setSending(false);
    }
};

  const socialLinks = [
    { icon: <MdFacebook size={24} />, name: 'Facebook', url: 'https://facebook.com/dreamhabitat' },
    { icon: <MdShare size={24} />, name: 'Twitter', url: 'https://twitter.com/dreamhabitat' },
    { icon: <MdOutlineAlternateEmail size={24} />, name: 'Email', url: 'mailto:contact@dreamhabitat.com' },
    { icon: <MdOutlineWhatsapp size={24} />, name: 'WhatsApp', url: 'https://wa.me/33123456789' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2">
            {/* Formulaire */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Votre message..."
                  />
                </div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg ${
                      status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors hover:from-purple-600 hover:to-purple-700"
                  disabled={sending}
                >
                  {sending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Nos coordonnées</h3>
                  <div className="space-y-4">
                    <p className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      123 Avenue du Design, 75001 Paris
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      +33 1 23 45 67 89
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      contact@dreamhabitat.com
                    </p>
                    <p className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      Lun-Ven: 9h00 - 18h00
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;