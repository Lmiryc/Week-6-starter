import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

import { demoMovies } from '../../data/movies';
import { saveFavorite } from '../../lib/favorites';
import { toggleFavorite } from '../../store';
import { MovieCard } from '../../components/MovieCard';

// Placeholder cast until real credits are loaded from TMDB.
const cast = ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'];

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const movie = demoMovies.find((item) => String(item.id) === String(id)) || demoMovies[0];

  const dispatch = useDispatch();
  const isSaved = useSelector((state) => state.favorites.ids.includes(movie.id));

  // Update the UI immediately, then persist. Undo the change if saving fails.
  const handleToggleFavorite = async () => {
    const nextSaved = !isSaved;
    dispatch(toggleFavorite(movie.id));
    try {
      await saveFavorite(movie.id, nextSaved);
    } catch {
      dispatch(toggleFavorite(movie.id));
    }
  };

  const recommendations = demoMovies.filter((item) => item.id !== movie.id).slice(0, 2);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.hero}>
          <Image source={{ uri: movie.poster }} style={styles.backdrop} />
          <View style={styles.overlay} />

          <Pressable style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <Pressable style={styles.heart} onPress={handleToggleFavorite}>
            <Text style={styles.heartText}>{isSaved ? '♥' : '♡'}</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.meta}>
            {movie.year}  ·  {movie.runtime}  ·  {movie.genre}
          </Text>
          <Text style={styles.score}>
            ★ {movie.rating.toFixed(1)} <Text style={styles.scoreLabel}>/ 10 community score</Text>
          </Text>

          <Text style={styles.heading}>Overview</Text>
          <Text style={styles.body}>{movie.overview}</Text>

          <Text style={styles.heading}>Top cast</Text>
          <View style={styles.cast}>
            {cast.map((name) => (
              <View key={name} style={styles.person}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{name[0]}</Text>
                </View>
                <Text style={styles.name}>{name}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.heading}>Reviews</Text>
          <View style={styles.review}>
            <Text style={styles.reviewText}>
              “Visually thrilling, emotionally grounded, and endlessly rewatchable.”
            </Text>
            <Text style={styles.author}>— MOVIEwiki community</Text>
          </View>

          <Text style={styles.heading}>You may also like</Text>
          {recommendations.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#0d0e15',
  },
  hero: {
    height: 280,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    opacity: 0.58,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,14,21,.28)',
  },
  back: {
    position: 'absolute',
    top: 18,
    left: 18,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.45)',
    borderRadius: 20,
  },
  backText: {
    color: 'white',
    fontSize: 37,
    lineHeight: 37,
  },
  heart: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.45)',
    borderRadius: 20,
  },
  heartText: {
    color: '#e8b84a',
    fontSize: 25,
  },
  content: {
    padding: 20,
    marginTop: -17,
    backgroundColor: '#0d0e15',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
  },
  meta: {
    color: '#a7aabd',
    marginTop: 7,
  },
  score: {
    color: '#f6c453',
    marginTop: 15,
    fontWeight: '800',
  },
  scoreLabel: {
    color: '#a7aabd',
    fontWeight: '400',
  },
  heading: {
    color: 'white',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 28,
    marginBottom: 10,
  },
  body: {
    color: '#c2c4cf',
    lineHeight: 22,
  },
  cast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  person: {
    width: 73,
    alignItems: 'center',
  },
  avatar: {
    height: 51,
    width: 51,
    borderRadius: 26,
    backgroundColor: '#393c4d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#e8b84a',
    fontSize: 20,
    fontWeight: '800',
  },
  name: {
    color: '#c2c4cf',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 6,
  },
  review: {
    backgroundColor: '#191b27',
    borderRadius: 13,
    padding: 14,
  },
  reviewText: {
    color: 'white',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  author: {
    color: '#e8b84a',
    marginTop: 8,
    fontSize: 12,
  },
});
