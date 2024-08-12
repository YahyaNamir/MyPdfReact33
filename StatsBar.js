import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StatsBar = ({stats}) => {
  return (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statRow}>
          <View
            style={[
              styles.statBar,
              {width: `${stat.teamA.percentage}%`, backgroundColor: 'red'},
            ]}>
            <Text style={styles.statText}>{stat.teamA.percentage}%</Text>
          </View>
          <View style={styles.statTitle}>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
          <View
            style={[
              styles.statBar,
              {width: `${stat.teamB.percentage}%`, backgroundColor: 'white'},
            ]}>
            <Text style={[styles.statText, {color: 'black'}]}>
              {stat.teamB.percentage}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statBar: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  statText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statTitle: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StatsBar;
