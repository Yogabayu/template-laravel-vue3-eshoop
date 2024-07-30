<template>
    <div>
        <v-parallax src="https://picsum.photos/1920/1080/" :height="300">
            <v-row align="center" justify="center" class="fill-height">
                <v-col cols="12" class="text-center">
                    <h1 class="text-h2 font-weight-bold text-white">Our Services</h1>
                    <p class="text-h5 font-weight-light mt-4 text-white">Discover the FreshScent Experience</p>
                </v-col>
            </v-row>
        </v-parallax>
        <v-container class="mt-16">
            <v-row>
                <v-col v-for="(service, index) in services" :key="service.title" cols="12" md="6" lg="4"
                    data-aos="fade-up" :data-aos-delay="200 * (index + 1)">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card class="mx-auto" max-width="400" v-bind="props" :elevation="isHovering ? 12 : 2"
                            :class="{ 'on-hover': isHovering }">
                            <v-img :src="service.image" height="200px" cover></v-img>
                            <v-card-title class="text-h5">{{ service.title }}</v-card-title>
                            <v-card-text>
                                <p>{{ service.description }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" variant="tonal">
                                    Learn More
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-hover>

                </v-col>
            </v-row>

            <v-row class="mt-12">
                <v-col cols="12">
                    <h2 class="text-h4 mb-6 text-center">Why Choose FreshScent?</h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col v-for="(feature, index) in features" :key="feature.title" cols="12" sm="6" md="3"
                    data-aos="fade-down" :data-aos-delay="200 * (index + 1)">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card class="text-center pa-4" flat v-bind="props" :elevation="isHovering ? 12 : 2"
                        :class="{ 'on-hover': isHovering }">
                            <v-icon :icon="feature.icon" size="48" color="primary" class="mb-4"></v-icon>
                            <h3 class="text-h6 mb-2">{{ feature.title }}</h3>
                            <p>{{ feature.description }}</p>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const services = ref([
    {
        title: 'Custom Fragrance Creation',
        description: 'Work with our expert perfumers to create your unique signature scent.',
        image: 'https://picsum.photos/1920/1080/'
    },
    {
        title: 'Home Scenting Consultation',
        description: 'Get personalized advice on how to enhance your living spaces with the perfect aromas.',
        image: 'https://picsum.photos/1920/1080/'
    },
    {
        title: 'Corporate Scent Branding',
        description: 'Develop a distinctive olfactory identity for your brand or business.',
        image: 'https://picsum.photos/1920/1080/'
    },
    {
        title: 'Aromatherapy Sessions',
        description: 'Experience the healing power of scents with our certified aromatherapists.',
        image: 'https://picsum.photos/1920/1080/'
    },
    {
        title: 'Scent Subscription Box',
        description: 'Receive a curated selection of seasonal fragrances delivered to your door monthly.',
        image: 'https://picsum.photos/1920/1080/'
    },
    {
        title: 'Fragrance Workshops',
        description: 'Join our interactive workshops to learn about perfume making and scent appreciation.',
        image: 'https://picsum.photos/1920/1080/'
    }
]);

const features = ref([
    {
        icon: 'mdi-leaf',
        title: 'Natural Ingredients',
        description: 'We use only the finest natural and sustainable ingredients in our products.'
    },
    {
        icon: 'mdi-beaker',
        title: 'Expert Craftsmanship',
        description: 'Our team of skilled perfumers brings years of experience to every creation.'
    },
    {
        icon: 'mdi-recycle',
        title: 'Eco-Friendly',
        description: 'We are committed to environmentally responsible practices in all our operations.'
    },
    {
        icon: 'mdi-hand-heart',
        title: 'Personalized Service',
        description: 'We offer tailored solutions to meet your unique scent preferences and needs.'
    }
]);
</script>

<style scoped>
.v-parallax::v-deep .v-parallax__content {
    background: rgba(0, 0, 0, 0.4);
    /* Overlay gelap untuk meningkatkan keterbacaan teks */
}

.on-hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
}
</style>
