import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Calendar as RNCalendar, Agenda } from 'react-native-calendars';
import BigCalendar, { CalendarEvent, Mode } from 'react-native-big-calendar';

// Dummy data for events/goals
const events: any[] = [
  {
    title: 'Meal Goal A',
    start: new Date(2025, 4, 21, 8, 0),
    end: new Date(2025, 4, 21, 9, 0),
  },
  {
    title: 'Meal Goal B',
    start: new Date(2025, 4, 22, 12, 0),
    end: new Date(2025, 4, 22, 13, 0),
  },
];

const viewModes: Mode[] = ['month', 'week', 'day'];

export default function CalendarComponent() {
  const [mode, setMode] = useState<Mode>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Render Year View as scrollable small month grid
  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);
    return (
      <ScrollView contentContainerStyle={styles.yearContainer}>
        {months.map((m) => (
          <View key={m} style={styles.monthGrid}>
            <Text style={styles.monthTitle}>
              {new Date(2025, m).toLocaleString('default', { month: 'short' })}
            </Text>
            <RNCalendar
              current={new Date(2025, m, 1).toISOString().split('T')[0]}
              hideExtraDays
              disabledByDefault
              markedDates={{}}
              style={styles.smallCalendar}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  // Switch between Year/Month/Week/Day
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          onPress={() => setMode('year')}
          style={[styles.button, mode === 'year' && styles.activeButton]}>
          <Text style={styles.btnText}>Year</Text>
        </TouchableOpacity>
        {viewModes.map((vm) => (
          <TouchableOpacity
            key={vm}
            onPress={() => setMode(vm)}
            style={[styles.button, mode === vm && styles.activeButton]}>
            <Text style={styles.btnText}>{vm.charAt(0).toUpperCase() + vm.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {mode === 'year' && renderYearView()}
      {mode !== 'year' && (
        <BigCalendar
          events={events}
          height={600}
          mode={mode}
          date={selectedDate}
          swipeEnabled
          onPressEvent={(e) => console.log('Event pressed', e)}
          onPressDateHeader={(d) => setSelectedDate(d)}
          headerContainerStyle={styles.header}
          hideNowIndicator
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  button: { padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#ccc' },
  activeButton: { backgroundColor: '#ddd' },
  btnText: { fontSize: 14 },
  yearContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  monthGrid: { width: '30%', margin: 5, alignItems: 'center' },
  monthTitle: { fontWeight: 'bold', marginBottom: 4 },
  smallCalendar: { width: 100, height: 100 },
  header: { padding: 10 },
});
