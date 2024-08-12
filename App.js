import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const playersList = [
  { id: '1', name: 'Abdelkrim ANBIA', position: 'GK', timeIn: '22:18', timeOut: '12:18' },
  { id: '2', name: 'Soufiane EL MESRAR', position: 'LB', timeIn: '22:18', timeOut: '12:18' },
  { id: '3', name: 'Anas EL AYAN', position: 'RB', timeIn: '22:18', timeOut: '12:18' },
  { id: '4', name: 'Soufian CHAARAOUI', position: 'LM', timeIn: '22:18', timeOut: '12:18' },
  { id: '5', name: 'EL KHADIR', position: 'RM', timeIn: '22:18', timeOut: '12:18' },
];

const absentPlayers = [
  { id: '1', name: 'Player 1' },
  { id: '2', name: 'Player 2' },
  { id: '3', name: 'Player 3' },
  { id: '4', name: 'Player 4' },
  { id: '5', name: 'Player 5' },
];

const positions = {
  GK: { top: '5%', right: '40%' },
  LB: { top: '15%', left: '10%' },
  RB: { top: '15%', right: '10%' },
  LM: { top: '30%', left: '15%' },
  RM: { top: '30%', right: '15%' },
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
    background-color: #14367b; 
    border-top: 1px solid #ccc;
    border-radius: 30px;
  ">
    ${absentPlayers
      .map(
        player => `
      <div style="
        flex: 0 0 auto; 
        width: 100px; 
        text-align: center; 
        margin-right: 5px;
        margin-bottom: 5px; 
      ">
        <div style="
          font-size: 16px; 
          color: #ffffff; 
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
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #e3eff4cd;
        border: 1px solid #00000083;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;">
        <div style="font-size: 14px; color: #000; font-family: 'Poppins-ExtraBold'; position: absolute; top: -15px;">
          ${player.position}
        </div>
        <div style="font-size: 10px; color: #000; font-family: 'Poppins-Bold'; text-align: center;">
          ${player.name}
        </div>
      </div>
    `,
      )
      .join('')}
  </div>
`;

const matchStatsHtml = (title, stats) => `
  <div style="background-color: #14367b; padding: 20px; border-radius: 15px; margin: 20px 0;">
    <h2 style="color: white; text-align: center;">${title}</h2>
    ${stats.map(stat => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #555;">
        <span style="color: white; font-weight: bold;">${stat.label}</span>
        <div style="display: flex; width: 50%; height: 5px; background: linear-gradient(to right, ${stat.team1Color} ${stat.team1Percentage}%, ${stat.team2Color} ${stat.team2Percentage}%); border-radius: 10px;"></div>
        <span style="color: white;">${stat.team1Value}</span>
        <span style="color: white;">${stat.team2Value}</span>
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
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              font-size: 14pt;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              background-color: #ffffff;
              padding: 10px;
              border-bottom: 1px solid #000000;
            }
            .header p {
              font-size: 24px;
              font-weight: bold;
              color: #000000;
              margin: 0;
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
            .page {
              page-break-after: always;
              position: relative;
              padding: 20px;
            }
            .top-left, .top-right {
              width: 45%;
              padding: 10px;
              box-sizing: border-box;
              float: left;
            }
            .top-right {
              float: right;
            }
            .top-left {
              border-right: 1px solid #ccc;
            }
            .lineup {
              position: relative;
              width: 100%;
              height: 200px;
              padding: 10px;
              box-sizing: border-box;
            }
            .lineup div {
              box-sizing: border-box;
              font-size: 14px;
            }
            .match-stats {
              margin-top: 20px;
            }
            .match-stats h2 {
              color: #fff;
            }
            .match-stats div {
              background-color: #14367b;
              padding: 10px;
              border-radius: 10px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <p>Match Info</p>
          </div>
          <div class="logos">
            <img src="https://seeklogo.com/images/R/raja-club-athletic-rca-logo-2C8B83D406-seeklogo.com.png" alt="RCA Logo" />
            <div>
              <div class="score">RCA 2 - 0 WAC</div>
              <div class="stadium">MOHAMMED VI Stadium</div>
            </div>
            <img src="https://seeklogo.com/images/W/wac-wydad-athletic-club-of-casablanca-2022-logo-67FEE5AE5E-seeklogo.com.png" alt="WAC Logo" />
          </div>
          <div class="page">
            <div class="top-left">
              <h1 style="text-align: center; color: #ff0000;">Player List</h1>
              <div>${playersHtml}</div>
              <div class="absent-players">
                <h2 style="text-align: center; color: #ff0000;">Absent Players</h2>
                ${absentPlayersHtml}
              </div>
            </div>
            <div class="top-right">
              <h1 style="text-align: center; color: #ff0000;">Lineup</h1>
              <div class="lineup">
                ${lineupHtml}
              </div>
              <div class="match-stats">
                ${matchStatsHtml('First Half Statistics', firstHalfStats)}
              </div>
            </div>
          </div>
          <div class="page">
            <div class="top-left">
              <div class="match-stats">
                ${matchStatsHtml('Second Half Statistics', secondHalfStats)}
              </div>
            </div>
            <div class="top-right">
              <div class="match-stats">
                ${matchStatsHtml('Full Match Statistics', fullMatchStats)}
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    fileName: 'match_report',
    directory: 'Documents',
  };

  try {
    let file = await RNHTMLtoPDF.convert(options);
    Alert.alert('PDF Created', `File saved at ${file.filePath}`);
  } catch (error) {
    Alert.alert('Error', `Failed to create PDF: ${error.message}`);
  }
};

const App = () => (
  <View style={styles.container}>
    <Button title="Create PDF" onPress={createPDF} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
