import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { demoMovies, genres } from '../data/movies';
import { MovieCard } from '../components/MovieCard';
import { useSearchMoviesQuery } from '../services/tmdbApi';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_POSTER = 'https://placehold.co/200x300/171923/ffffff?text=MOVIEwiki';
const MIN_SEARCH_LENGTH = 2;

// Convert a TMDB search result into the same shape as our demo movies.
function toMovie(tmdbMovie) {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    year: tmdbMovie.release_date?.slice(0, 4) || '—',
    rating: tmdbMovie.vote_average || 0,
    genre: 'TMDB',
    runtime: '',
    poster: tmdbMovie.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}`
      : PLACEHOLDER_POSTER,
    overview: tmdbMovie.overview,
  };
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('rating');

  // Only call TMDB when a token is configured and the query is long enough.
  const hasTmdbToken = Boolean(process.env.EXPO_PUBLIC_TMDB_TOKEN);
  const shouldSkipSearch = !hasTmdbToken || query.trim().length < MIN_SEARCH_LENGTH;
  const { data: tmdbResults } = useSearchMoviesQuery(query, { skip: shouldSkipSearch });

  const liveMovies = (tmdbResults?.results || []).map(toMovie);
  const source = liveMovies.length ? liveMovies : demoMovies;

  const movies = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    const filtered = source.filter((movie) => {
      const matchesGenre = genre === 'All' || movie.genre === genre;
      const matchesTitle = movie.title.toLowerCase().includes(lowerQuery);
      return matchesGenre && matchesTitle;
    });

    return filtered.sort((a, b) => {
      if (sort === 'rating') {
        return b.rating - a.rating;
      }
      return Number(b.year) - Number(a.year);
    });
  }, [source, query, genre, sort]);

  const toggleSort = () => setSort(sort === 'rating' ? 'date' : 'rating');

  const header = (
    <>
      <Text style={styles.wordmark}>
        MOVIE<Text style={styles.gold}>wiki</Text>
      </Text>
      <Text style={styles.subtitle}>Find something worth watching.</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies by title"
        placeholderTextColor="#8d91a3"
        style={styles.input}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        {genres.map((item) => {
          const isActive = genre === item;
          return (
            <Pressable
              key={item}
              onPress={() => setGenre(item)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.results}>
        <Text style={styles.heading}>{movies.length} movies</Text>
        <Pressable onPress={toggleSort}>
          <Text style={styles.sort}>
            Sort: {sort === 'rating' ? 'Rating' : 'Release date'} ↓
          </Text>
        </Pressable>
      </View>
    </>
  );

  const emptyState = (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>No titles found</Text>
      <Text style={styles.emptyText}>Try another title or genre.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
        ListHeaderComponent={header}
        ListEmptyComponent={emptyState}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#0d0e15',
  },
  list: {
    padding: 20,
    paddingBottom: 32,
  },
  wordmark: {
    color: 'white',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -1,
  },
  gold: {
    color: '#e8b84a',
  },
  subtitle: {
    color: '#a7aabd',
    marginTop: 5,
    marginBottom: 19,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1b1d29',
    color: 'white',
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  chips: {
    marginTop: 16,
    marginBottom: 20,
  },
  chip: {
    borderColor: '#373a4b',
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#e8b84a',
    borderColor: '#e8b84a',
  },
  chipText: {
    color: '#bec1ce',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#17130a',
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  sort: {
    color: '#e8b84a',
    fontSize: 13,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 55,
  },
  emptyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: '#a7aabd',
    marginTop: 7,
  },
});
