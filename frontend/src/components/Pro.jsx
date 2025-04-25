import React from 'react';
import { motion } from 'framer-motion';
import {
    MdBusiness,
    MdAnalytics,
    MdPeople,
    MdSecurity,
    MdSupport,
    MdBrandingWatermark,
    MdSpeed,
    MdApi,
    MdStorage,
    MdPriceCheck
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import avatar from '../assets/img/avatar.jpg';

const Pro = () => {
    const proFeatures = [
        {
            icon: <MdBusiness className="w-6 h-6" />,
            title: "Projet Multi-Clients",
            description: "Gérez plusieurs clients et projets depuis un tableau de bord centralisé."
        },
        {
            icon: <MdAnalytics className="w-6 h-6" />,
            title: "Analyses Détaillées",
            description: "Accédez à des rapports détaillés et des analyses approfondies de vos projets."
        },
        {
            icon: <MdPeople className="w-6 h-6" />,
            title: "Collaboration d'Équipe",
            description: "Travaillez en équipe avec des rôles et permissions personnalisés."
        },
        {
            icon: <MdBrandingWatermark className="w-6 h-6" />,
            title: "Marque Personnalisée",
            description: "Ajoutez votre logo et personnalisez l'interface pour vos clients."
        },
        {
            icon: <MdApi className="w-6 h-6" />,
            title: "API Professionnelle",
            description: "Intégrez nos services directement dans vos applications."
        },
        {
            icon: <MdStorage className="w-6 h-6" />,
            title: "Stockage Illimité",
            description: "Aucune limite de stockage pour vos projets et rendus."
        }
    ];

    const benefits = [
        {
            icon: <MdSpeed className="w-8 h-8" />,
            title: "Rendus Prioritaires",
            description: "Vos projets sont traités en priorité avec des serveurs dédiés."
        },
        {
            icon: <MdSecurity className="w-8 h-8" />,
            title: "Sécurité Avancée",
            description: "Protection des données de niveau entreprise et conformité RGPD."
        },
        {
            icon: <MdSupport className="w-8 h-8" />,
            title: "Support Dédié",
            description: "Une équipe dédiée à votre service 24/7 avec un temps de réponse garanti."
        }
    ];

    return (
        // <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        //   {/* Hero Section */}
        //   <div className="max-w-7xl mx-auto px-4 py-20">
        //     <motion.div
        //       initial={{ opacity: 0, y: 20 }}
        //       animate={{ opacity: 1, y: 0 }}
        //       transition={{ duration: 0.6 }}
        //       className="text-center"
        //     >
        //       <h1 className="text-5xl font-bold mb-6">
        //         DREAM HABITAT
        //         <span className="text-yellow-400"> PRO</span>
        //       </h1>
        //       <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
        //         Des outils professionnels puissants pour les architectes, designers et professionnels de l'immobilier.
        //       </p>
        //       <motion.div
        //         whileHover={{ scale: 1.05 }}
        //         whileTap={{ scale: 0.95 }}
        //       >
        //         <Link
        //           to="/contact"
        //           className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-colors"
        //         >
        //           Demander une démo
        //         </Link>
        //       </motion.div>
        //     </motion.div>
        //   </div>

        //   {/* Benefits Section */}
        //   <div className="max-w-7xl mx-auto px-4 py-16">
        //     <div className="grid md:grid-cols-3 gap-8">
        //       {benefits.map((benefit, index) => (
        //         <motion.div
        //           key={benefit.title}
        //           initial={{ opacity: 0, y: 20 }}
        //           animate={{ opacity: 1, y: 0 }}
        //           transition={{ delay: index * 0.2 }}
        //           className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700"
        //         >
        //           <div className="text-yellow-400 mb-4">{benefit.icon}</div>
        //           <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
        //           <p className="text-gray-300">{benefit.description}</p>
        //         </motion.div>
        //       ))}
        //     </div>
        //   </div>

        //   {/* Features Grid */}
        //   <div className="max-w-7xl mx-auto px-4 py-16">
        //     <motion.h2
        //       initial={{ opacity: 0 }}
        //       animate={{ opacity: 1 }}
        //       className="text-3xl font-bold mb-12 text-center"
        //     >
        //       Fonctionnalités Pro
        //     </motion.h2>
        //     <div className="grid md:grid-cols-3 gap-8">
        //       {proFeatures.map((feature, index) => (
        //         <motion.div
        //           key={feature.title}
        //           initial={{ opacity: 0, scale: 0.95 }}
        //           animate={{ opacity: 1, scale: 1 }}
        //           transition={{ delay: index * 0.1 }}
        //           className="bg-gray-800/30 rounded-lg p-6 hover:bg-gray-800/50 transition-all border border-gray-700/50"
        //         >
        //           <div className="text-yellow-400 mb-4">{feature.icon}</div>
        //           <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        //           <p className="text-gray-400">{feature.description}</p>
        //         </motion.div>
        //       ))}
        //     </div>
        //   </div>

        //   {/* Pricing CTA */}
        //   <div className="max-w-7xl mx-auto px-4 py-20">
        //     <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-12 text-center">
        //       <motion.div
        //         initial={{ opacity: 0, y: 20 }}
        //         animate={{ opacity: 1, y: 0 }}
        //         transition={{ duration: 0.6 }}
        //       >
        //         <h2 className="text-3xl font-bold mb-6">
        //           Tarification sur mesure pour les professionnels
        //         </h2>
        //         <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        //           Des forfaits adaptés à vos besoins avec une facturation flexible et des remises volume.
        //         </p>
        //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
        //           <motion.button
        //             whileHover={{ scale: 1.05 }}
        //             whileTap={{ scale: 0.95 }}
        //             className="px-8 py-4 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        //           >
        //             Voir les tarifs Pro
        //           </motion.button>
        //           <motion.button
        //             whileHover={{ scale: 1.05 }}
        //             whileTap={{ scale: 0.95 }}
        //             className="px-8 py-4 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        //           >
        //             Contacter l'équipe commerciale
        //           </motion.button>
        //         </div>
        //       </motion.div>
        //     </div>
        //   </div>

        //   {/* Testimonials */}
        //   <div className="max-w-7xl mx-auto px-4 py-16">
        //     <motion.div
        //       initial={{ opacity: 0 }}
        //       animate={{ opacity: 1 }}
        //       className="text-center mb-12"
        //     >
        //       <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
        //       <p className="text-gray-300">Des professionnels qui transforment leur business avec DREAM HABITAT PRO</p>
        //     </motion.div>
        //     <div className="grid md:grid-cols-3 gap-8">
        //       {/* Vous pouvez ajouter des témoignages ici */}
        //     </div>
        //   </div>

        //   {/* Footer CTA */}
        //   <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        //     <motion.div
        //       initial={{ opacity: 0, y: 20 }}
        //       animate={{ opacity: 1, y: 0 }}
        //       transition={{ duration: 0.6 }}
        //     >
        //       <h2 className="text-3xl font-bold mb-6">
        //         Prêt à passer au niveau supérieur ?
        //       </h2>
        //       <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        //         Rejoignez les professionnels qui transforment l'industrie du design d'intérieur.
        //       </p>
        //       <motion.button
        //         whileHover={{ scale: 1.05 }}
        //         whileTap={{ scale: 0.95 }}
        //         className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-colors"
        //       >
        //         Commencer maintenant
        //       </motion.button>
        //     </motion.div>
        //   </div>
        // </div>
        // Remplacez le contenu existant par :

        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold mb-6">
                        DREAM HABITAT
                        <span className="text-blue-600"> PRO</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Des outils professionnels puissants pour les architectes, designers et professionnels de l'immobilier.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-colors"
                        >
                            Demander une démo
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                        >
                            <div className="text-blue-500 mb-4">{benefit.icon}</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold mb-12 text-center text-gray-800"
                >
                    Fonctionnalités Pro
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {proFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg p-6 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
                        >
                            <div className="text-blue-500 mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pricing CTA */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            Tarification sur mesure pour les professionnels
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Des forfaits adaptés à vos besoins avec une facturation flexible et des remises volume.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Voir les tarifs Pro
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                            >
                                Contacter l'équipe commerciale
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Ils nous font confiance</h2>
                    <p className="text-gray-600">Des professionnels qui transforment leur business avec DREAM HABITAT PRO</p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center mb-4">
                            <img src={avatar} alt="Sophie" className="w-12 h-12 rounded-full" />
                            <div className="ml-4">
                                <h4 className="font-semibold text-gray-800">Sophie Martin</h4>
                                <p className="text-sm text-gray-500">Architecte d'intérieur</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            "DREAM HABITAT PRO a révolutionné ma façon de travailler. Je peux maintenant présenter plusieurs designs à mes clients en quelques minutes."
                        </p>
                        <div className="flex text-blue-500">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center mb-4">
                            <img src={avatar} alt="Thomas" className="w-12 h-12 rounded-full" />
                            <div className="ml-4">
                                <h4 className="font-semibold text-gray-800">Thomas Dubois</h4>
                                <p className="text-sm text-gray-500">Designer d'espace</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            "La qualité des rendus et la rapidité du service sont impressionnantes. Un outil indispensable pour tout professionnel du design."
                        </p>
                        <div className="flex text-blue-500">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center mb-4">
                            <img src={avatar} alt="Marie" className="w-12 h-12 rounded-full" />
                            <div className="ml-4">
                                <h4 className="font-semibold text-gray-800">Marie Laurent</h4>
                                <p className="text-sm text-gray-500">Décoratrice d'intérieur</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            "Le support client est exceptionnel et les fonctionnalités pro répondent parfaitement à mes besoins quotidiens."
                        </p>
                        <div className="flex text-blue-500">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        Prêt à passer au niveau supérieur ?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Rejoignez les professionnels qui transforment l'industrie du design d'intérieur.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-colors"
                    >
                        Commencer maintenant
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Pro;