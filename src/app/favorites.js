import { useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from 'expo-router';
import { demoMovies } from '../data/movies';
import { MovieCard } from '../components/MovieCard';
import { getFavoriteIds } from '../lib/favorites';
import { setFavorites } from '../store';
export default function Favorites() { const dispatch = useDispatch(); const ids = useSelector((state) => state.favorites.ids); const refresh = useCallback(() => { getFavoriteIds().then((rows) => dispatch(setFavorites(rows))).catch(() => {}); }, [dispatch]); useEffect(refresh, [refresh]); useFocusEffect(refresh); const movies = demoMovies.filter((movie) => ids.includes(movie.id)); return <SafeAreaView style={styles.page}><Text style={styles.title}>Your favorites</Text><Text style={styles.caption}>Your saved watchlist, always close by.</Text><View style={styles.content}>{movies.length ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />) : <View style={styles.empty}><Text style={styles.heart}>♡</Text><Text style={styles.emptyTitle}>Nothing saved yet</Text><Text style={styles.emptyText}>Tap the heart on a movie to add it here.</Text></View>}</View></SafeAreaView>; }
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#0d0e15', padding: 20 }, title: { color: 'white', fontSize: 27, fontWeight: '900', marginTop: 6 }, caption: { color: '#a7aabd', marginTop: 6 }, content: { marginTop: 27 }, empty: { alignItems: 'center', paddingTop: 110 }, heart: { color: '#e8b84a', fontSize: 52 }, emptyTitle: { color: 'white', fontSize: 19, fontWeight: '800', marginTop: 14 }, emptyText: { color: '#a7aabd', marginTop: 8, textAlign: 'center' } });
