import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const playersList = [
  { id: '1', name: 'ANBIA', position: 'GK', timeIn: '22:18', timeOut: '12:18' },
  { id: '2', name: 'EL-MESRAR', position: 'LB', timeIn: '22:18', timeOut: '12:18' },
  { id: '3', name: 'EL-AYAN', position: 'RB', timeIn: '22:18', timeOut: '12:18' },
  { id: '4', name: 'CHAARAOUI', position: 'LM', timeIn: '22:18', timeOut: '12:18' },
  { id: '5', name: 'EL-KHADIR', position: 'RM', timeIn: '22:18', timeOut: '12:18' },
];

const absentPlayers = [
  { id: '1', name: 'Player 1' },
  { id: '2', name: 'Player 2' },
  { id: '3', name: 'Player 3' }
];

const positions = {
  GK: { top: '38%', left: '8%' },
  LB: { top: '15%', left: '25%' },
  RB: { top: '70%', left: '25%' },
  LM: { top: '20%', right: '30%' },
  RM: { top: '60%', right: '30%' },
};

const playerItemHtml = player => `
  <div style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #ccc;">
    <div style="width: 30px; text-align: center; font-family: 'Poppins-ExtraBold'; font-size: 14px; color: #333;">
      ${player.id}
    </div>
    <div style="flex: 1; margin-left: 10px; font-family: 'Poppins-Regular'; font-size: 15px; color: #000;">
      ${player.name}
    </div>
    <div style="display: flex; align-items: center; margin-left: auto;">
      <div style="background-color: #c1c416b4; color: #000; font-family: 'Poppins-Regular'; font-size: 12px; padding: 5px 8px; border-radius: 5px; margin-left: 10px; text-align: center;">
        ${player.position}
      </div>
      <div style="background-color: #e0ffe0; color: #00a000; font-family: 'Poppins-Regular'; font-size: 12px; padding: 5px 8px; border-radius: 5px; margin-left: 10px; text-align: center;">
        🟢 ${player.timeIn}
      </div>
      <div style="background-color: #ffe0e0; color: #a00000; font-family: 'Poppins-Regular'; font-size: 12px; padding: 5px 8px; border-radius: 5px; margin-left: 10px; text-align: center;">
        🔴 ${player.timeOut}
      </div>
    </div>
  </div>
`;

const absentPlayersHtml = `
  <div style="
    display: flex; 
    flex-wrap: wrap; 
    padding: 5px; 
    background-color: #a1a3a7;
    color;  
    border-top: 1px solid #ccc;
    border-radius: 30px;
  ">
    ${absentPlayers
      .map(
        player => `
      <div style="
        flex: 0 0 auto; 
        width: 90px; 
        color: #000000;
        text-align: center; 
        margin-right: 5px;
        margin-bottom: 5px; 
      ">
        <div style="
          font-size: 14px; 
          color: #000000; 
          font-family: 'Poppins-Bold';
        ">
          ${player.name}
        </div>
      </div>
    `,
      )
      .join('')}
  </div>
`;

const playersHtml = playersList.map(player => playerItemHtml(player)).join('');

const lineupHtml = `
  <div style="position: relative; width: 100%; height: 100%; padding: 10px;">
    ${playersList
      .map(
        player => `
      <div style="
        position: absolute;
        ${
          positions[player.position].top
            ? `top: ${positions[player.position].top};`
            : ''
        }
        ${
          positions[player.position].left
            ? `left: ${positions[player.position].left};`
            : ''
        }
        ${
          positions[player.position].right
            ? `right: ${positions[player.position].right};`
            : ''
        }
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #2fb1e8cd;
        border: 1px solid #00000083;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;">
        <div style="font-size: 14px; color: #000; font-family: 'Poppins-ExtraBold'; position: absolute; top: -15px;">
          ${player.position}
        </div>
        <div style="font-size: 8px; color: #000; font-family: 'Poppins-Bold'; text-align: center;">
          ${player.name}
        </div>
      </div>
    `,
      )
      .join('')}
  </div>
`;

const matchStatsHtml = (title, stats) => `
  <div style="background-color: #14367b; padding: 5px; border-radius: 15px; margin: 10px 0;">
    <h2 style="color: white; text-align: center;">${title}</h2>
    ${stats.map(stat => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #555;">
        <span style="color: white; font-weight: bold;">${stat.label}</span>
        <div style="display: flex; justify-content: space-between; align-items: center; width: 50%; margin: 0 10px;">
          <span style="color: ${stat.team1Color}; font-weight: bold; margin-right: 5px;">${stat.team1Value}</span>
          <div style="flex: 1; height: 5px; background: ${stat.team1Color}; border-radius: 10px; margin-right: 5px;"></div>
          <div style="flex: 1; height: 5px; background: ${stat.team2Color}; border-radius: 10px;"></div>
          <span style="color: ${stat.team2Color}; font-weight: bold; margin-left: 5px;">${stat.team2Value}</span>
        </div>
      </div>
    `).join('')}
  </div>
`;

const createPDF = async () => {
  const firstHalfStats = [
    { label: 'Possession de balle', team1Value: '56%', team2Value: '44%', team1Color: 'red', team2Color: 'white', team1Percentage: 56, team2Percentage: 44 },
    { label: 'Nombre de tirs', team1Value: '12', team2Value: '8', team1Color: 'red', team2Color: 'white', team1Percentage: 60, team2Percentage: 40 },
    { label: 'Tirs cadrés', team1Value: '9', team2Value: '2', team1Color: 'red', team2Color: 'white', team1Percentage: 82, team2Percentage: 18 },
    { label: 'Passes réussies', team1Value: '523 (89%)', team2Value: '403 (89%)', team1Color: 'red', team2Color: 'white', team1Percentage: 89, team2Percentage: 89 },
    { label: 'Fautes', team1Value: '11', team2Value: '6', team1Color: 'red', team2Color: 'white', team1Percentage: 65, team2Percentage: 35 }
  ];

  const secondHalfStats = firstHalfStats;

  const fullMatchStats = firstHalfStats; 

  let options = {
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Poppins-Regular';
            }
              .logos {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 20px;
              background-color: #14367b;
              color: #fff;
              text-align: center;
              margin-top: 10px;
              border-radius: 30px;
            }
            .logos img {
              height: 50px;
            }
            .logos .score {
              font-size: 24px;
              font-weight: bold;
            }
            .logos .stadium {
              font-size: 18px;
              color: #ccc;
            }
            .header {
              color: #000000;
              padding: 20px;
              text-align: center;
              font-size: 40px;
              border-bottom: 5px solid #e3eff4;
            }
            .header p {
              font-size: 24px;
              font-family: 'Poppins-Bold';
              margin: 0;
            }
            .header img {
              margin-top: 20px;
            }
            .content {
              padding: 30px;
              display: flex;
            }
            .left-section, .right-section {
              width: 50%;
            }
            .right-section {
              padding-left: 30px;
            }
            .section {
              margin-bottom: 30px;
              padding: 10px;
              background-color: #f9f9f9;
              border-radius: 10px;
            }
            .lineup {
              position: relative;
              border: 2px solid #e3eff4;
              border-radius: 10px;
              background-image: url('https://upload.wikimedia.org/wikipedia/commons/c/c9/FutsalPitch.png');
              width: 100%; 
              margin : 4px;
              height: 280px;
              background-repeat: no-repeat; 
              background-size: cover;
              margin-bottom: 30px;
            }
            .player {
              position: absolute;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background-color: #e3eff4cd;
              border: 1px solid #00000083;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 5px;
            }
            .player .name {
              font-size: 12px;
              color: #000000;
              text-align: center;
            }
            .player .position {
              font-size: 14px;
              color: #000000;
              position: absolute;
              top: -15px;
              text-align: center;
              font-family: Poppins-Bold;
            }
            .full-stat-section {
              margin-top: 50px;
              padding: 20px;
              color: #000000;
              border-radius: 15px;
              text-align: centre;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <p> Match Info : </p>
          </div>
            <div class="logos">
            <img src="https://seeklogo.com/images/R/raja-club-athletic-rca-logo-2C8B83D406-seeklogo.com.png" alt="RCA Logo" />
            <div>
              <div class="score">RCA 2 - 0 WAC</div>
              <div class="stadium">MOHAMMED VI Stadium</div>
            </div>
            <img src="https://seeklogo.com/images/W/wac-wydad-athletic-club-of-casablanca-2022-logo-67FEE5AE5E-seeklogo.com.png" alt="WAC Logo" />
          </div>
          <div class="content">
            <div class="left-section">
              <h2>Players List</h2>
              <div class="section">${playersHtml}</div>

              <h2>Absent Players</h2>
              <div class="section">${absentPlayersHtml}</div>

              <h2>First Half Statistics</h2>
              <div class="section">${matchStatsHtml('First Half Statistics', firstHalfStats)}</div>
            </div>
            <div class="right-section">
              <h2>Lineup</h2>
              <div class="lineup">${lineupHtml}</div>

              <h2>Second Half Statistics</h2>
              <div class="section">${matchStatsHtml('Second Half Statistics', secondHalfStats)}</div>
            </div>
          </div>
          <div class="full-stat-section">
            <h2>Full Match Statistics</h2>
            ${matchStatsHtml('Full Match Statistics', fullMatchStats)}
          </div>
        </body>
      </html>
    `,
    fileName: 'match_report',
    directory: 'Documents',
  };

  try {
    let file = await RNHTMLtoPDF.convert(options);
    Alert.alert('PDF Generated', `PDF file has been saved to: ${file.filePath}`);
  } catch (error) {
    Alert.alert('Error', 'Failed to generate PDF');
    console.error(error);
  }
};

const App = () => {
  return (
    <View style={styles.container}>
      <Button title="Generate PDF" onPress={createPDF} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
