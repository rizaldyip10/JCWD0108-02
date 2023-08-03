import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const generatePDFContent = (data) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.table}>
          {/* Table Headers */}
          <View style={styles.tableRow}>
            <Text style={styles.headerCell}>Order ID</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Amount</Text>
            <Text style={styles.headerCell}>Cashier</Text>
          </View>
  
          {/* Table Data */}
          {data?.map((v, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.cell}>{`#${v.id}`}</Text>
              <Text style={styles.cell}>
                {new Date(`${v.createdAt}`).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
              <Text style={styles.cell}>{formatIDR(v.amount)}</Text>
              <Text style={styles.cell}>{`${v.Cashier.firstName} ${v.Cashier.lastName}`}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      padding: 20,
      color: '#000'
    },
    table: {
      display: 'table',
      width: '100%',
      color: '#000'
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#000',
      alignItems: 'center',
      height: 24,
    },
    headerCell: {
      fontWeight: 'bold',
      padding: 5,
    },
    cell: {
      padding: 5,
    },
  });

  const formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

export default generatePDFContent