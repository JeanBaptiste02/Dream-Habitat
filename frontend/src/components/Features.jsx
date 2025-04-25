import React from 'react';
import { motion } from 'framer-motion';
import {
    MdDesignServices,
    MdAutoAwesome,
    MdSpeed,
    MdPhotoLibrary,
    MdStyle,
    MdSyncAlt,
    MdDevices,
    MdBrush,
    MdSave,
    MdSettings,
    MdPalette,
    MdArchitecture
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Features = () => {
    const mainFeatures = [
        {
            icon: <MdAutoAwesome className="w-8 h-8" />,
            title: "Intelligence Artificielle Avancée",
            description: "Notre IA analyse votre espace et propose des designs personnalisés qui correspondent parfaitement à vos goûts et à votre style de vie."
        },
        {
            icon: <MdSpeed className="w-8 h-8" />,
            title: "Redesign Instantané",
            description: "Obtenez des visualisations de votre espace réinventé en quelques secondes seulement, sans attente ni délai."
        },
        {
            icon: <MdPhotoLibrary className="w-8 h-8" />,
            title: "Multiple Variations",
            description: "Explorez différentes versions de votre espace avec plusieurs styles et thèmes pour trouver celui qui vous convient le mieux."
        }
    ];

    const detailedFeatures = [
        {
            icon: <MdStyle className="w-6 h-6" />,
            title: "Styles Personnalisés",
            description: "Des dizaines de styles prédéfinis et la possibilité de créer vos propres combinaisons."
        },
        {
            icon: <MdSyncAlt className="w-6 h-6" />,
            title: "Comparaison Avant/Après",
            description: "Visualisez facilement les transformations avec notre outil de comparaison interactif."
        },
        {
            icon: <MdDevices className="w-6 h-6" />,
            title: "Multi-Plateforme",
            description: "Accessible sur tous vos appareils, synchronisation automatique de vos projets."
        },
        {
            icon: <MdBrush className="w-6 h-6" />,
            title: "Personnalisation Avancée",
            description: "Ajustez chaque aspect du design selon vos préférences."
        },
        {
            icon: <MdSave className="w-6 h-6" />,
            title: "Sauvegarde des Projets",
            description: "Conservez tous vos designs et revenez-y quand vous voulez."
        },
        {
            icon: <MdSettings className="w-6 h-6" />,
            title: "Options Professionnelles",
            description: "Des fonctionnalités avancées pour les designers et architectes."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-bold mb-6">
                        Transformez votre espace avec
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> DREAM HABITAT</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez comment notre technologie IA révolutionne le design d'intérieur et rend la décoration plus accessible que jamais.
                    </p>
                </motion.div>
            </div>

            {/* Main Features */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {mainFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Interactive Demo Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 my-16">
                <div className="max-w-7xl mx-auto px-4 text-white">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Voyez la magie en action</h2>
                            <p className="text-lg mb-8">
                                Téléchargez une photo de votre pièce et observez comment DREAM HABITAT la transforme instantanément avec différents styles et ambiances.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                Essayer maintenant
                            </motion.button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/10 rounded-2xl p-4 aspect-video"
                        >
                            {/* Placeholder pour démo interactive */}
                            <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center">
                                <MdDesignServices className="w-20 h-20 text-white/40" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Detailed Features */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-3 gap-8"
                >
                    {detailedFeatures.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="bg-white/50 backdrop-blur-sm rounded-xl p-6 hover:bg-white transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-6">
                        Prêt à transformer votre espace ?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur intérieur avec DREAM HABITAT.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                        onClick={() => navigate('/comment-ca-marche')}
                    >
                        Commencer gratuitement
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Features;