function computeRegisters() {
  BW=myBW.selectedIndex;
  CR=myCR.selectedIndex+1;
  HM=myHM.selectedIndex;
  cm="// BW = "+BW+": "+myBW.value+", C/R = "+CR+": 4/"+(CR+4)+", HM = "+HM+"\n";
  reg1=parseInt(BW)*16+parseInt(CR)*2+parseInt(HM);
  s="";
  if (reg1<16) s="0";
  s="uint8_t reg1 = 0x"+s+reg1.toString(16)+";";
  TAresult.innerHTML=cm+s;
  
  s="";
  SF=mySF.selectedIndex+6;
  CRC=myCRC.selectedIndex;
  cm="// SF = "+SF+": "+mySF.value+", CRC = "+CRC+"\n";
  reg2=parseInt(SF)*16+parseInt(CRC)*4;
  if (reg2<16) s="0";
  s="uint8_t reg2 = 0x"+reg2.toString(16)+";";
  TAresult.innerHTML+="\n"+cm+s;
  
  s="";
  LDRO=myLowData.selectedIndex;
  AGCOn=myAGC.selectedIndex;
  cm="// LDRO = "+LDRO+", AGCAutoOn = "+AGCOn+"\n";
  reg3=parseInt(LDRO)*8+parseInt(AGCOn)*4;
  if (reg3<16) s="0";
  s="uint8_t reg3 = 0x"+s+reg3.toString(16)+";";
  TAresult.innerHTML += "\n"+cm+s;
  
  MaxPower=myMaxPower.selectedIndex;
  pmax=10.8+0.6*parseInt(MaxPower);
  //PMAXlabel.Text=pmax+" dBm";
  
  paselect=myPaSelect.selectedIndex;
  pOut = 0;
  OutputPower=myOutputPower.selectedIndex;
  if (paselect == 1) pOut=17-(15-OutputPower); // (PA_BOOST pin);
  else pOut=pmax-(15-OutputPower); // if PaSelect = 0 (RFO pin);
  //OutputPowerlabel.Text=pOut+" dBm";
  
  s="";
  cm="// PaSelect = "+paselect+", MaxPower = "+MaxPower+": "+pmax+" dBm, OutputPower = "+OutputPower+": "+pOut+" dBm"+"\n";
  regpaconfig=parseInt(paselect)*128+parseInt(MaxPower)*16+parseInt(OutputPower);
  if (regpaconfig<16) s="0";
  s="uint8_t regpaconfig = 0x"+s+regpaconfig.toString(16)+";";
  TAresult.innerHTML += "\n"+cm+s;
  
  TAresult.innerHTML += "\n"+"#define REG_OCP 0x0B";
  TAresult.innerHTML += "\n"+"#define REG_PA_CONFIG 0x09";
  TAresult.innerHTML += "\n"+"#define REG_LNA 0x0c";
  TAresult.innerHTML += "\n"+"#define REG_OP_MODE 0x01";
  TAresult.innerHTML += "\n"+"#define REG_MODEM_CONFIG_1 0x1d";
  TAresult.innerHTML += "\n"+"#define REG_MODEM_CONFIG_2 0x1e";
  TAresult.innerHTML += "\n"+"#define REG_MODEM_CONFIG_3 0x26";
  TAresult.innerHTML += "\n"+"#define REG_PA_DAC 0x4D";
  TAresult.innerHTML += "\n"+"#define PA_DAC_HIGH 0x87";
  TAresult.innerHTML += "\n"+"#define MODE_LONG_RANGE_MODE 0x80";
  TAresult.innerHTML += "\n"+"#define MODE_SLEEP 0x00";
  TAresult.innerHTML += "\n"+"#define MODE_STDBY 0x01";
  TAresult.innerHTML += "\n"+"#define MODE_TX 0x03";
  TAresult.innerHTML += "\n"+"#define MODE_RX_CONTINUOUS 0x05";
  TAresult.innerHTML += "\n"+"#define MODE_RX_SINGLE 0x06";
  
  TAresult.innerHTML += "\n"+"LoRa.writeRegister(REG_OP_MODE, MODE_LONG_RANGE_MODE | MODE_SLEEP);";
  TAresult.innerHTML += "\n"+"delay(10);";
  TAresult.innerHTML += "\n"+"LoRa.writeRegister(REG_PA_CONFIG, regpaconfig);";
  TAresult.innerHTML += "\n"+"LoRa.writeRegister(REG_MODEM_CONFIG_1, reg1);";
  TAresult.innerHTML += "\n"+"LoRa.writeRegister(REG_MODEM_CONFIG_2, reg2);";
  TAresult.innerHTML += "\n"+"LoRa.writeRegister(REG_MODEM_CONFIG_3, reg3);";
  TAresult.innerHTML += "\n"+"delay(10);";
  TAresult.innerHTML += "\n"+"LoRa.writeRegister(REG_OP_MODE, MODE_LONG_RANGE_MODE | MODE_STDBY);";
  
  hljs.highlightAll();
}
