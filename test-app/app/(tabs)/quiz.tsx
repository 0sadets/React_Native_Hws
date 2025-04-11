import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function QuizScreen() {
  const questions: string[] = [
    "Ти, як правило, завжди буваєш всім задоволений?",
    "Тобі іноді заважають заснути різні думки?",
    // "Чи було коли-небудь так, що тобі довірили таємницю, а ти з яких-небудь причин не зміг її зберегти?",
    // "Чи було коли-небудь так, що тобі стає сумно без особливої причини?",
    // "Чи любиш ти жартувати над ким-небудь?",
    // "Чи можеш ти сказати про себе, що ти взагалі весела людина?",
    // "Чи часто ти потребуєш допомоги інших хлопців?",
    // "Чи часто у тебе міняється настрій?",
    // "Якщо ти хочеш познайомитися з іншим хлопчиком або дівчинкою, то ти завжди першим починаєш розмову?",
    // "Якщо ти опиняєшся в дурному становищі, то ти потім довго розбудовуєшся?",
    // "Як часто ти  відволікаєшся, коли робиш уроки?",
    // "Як ти думаєш, тебе вважають веселою людиною?",
    // "Чи траплялося тобі говорити про будь-кого погано?",
    // "Чи можеш ти сказати, що ти трохи більше образливий людина, ніж інші?",
    // "Чи можеш ти сказати про себе, що ти безтурботна людина?",
    // "Чи можеш ти веселитися, не стримуючи себе, в компанії інших хлопців?",
    // "Чи було коли-небудь так, що тебе попросили  допомогти у будинку по господарству, а ти з якоїсь причини не зміг цього зробити?",
    // "Чи буває таке, що тобі іноді більше подобається бути одному, ніж зустрічатися з іншими хлопцями?",
    // "Чи буває таке, що, перебуваючи в суспільстві інших хлопців, ти найчастіше мовчиш?",
    // "Чи буває, що ти так хвилюєшся, що не можеш всидіти на місці?",
    // "Чи буває, що у тебе без особливої причини паморочиться голова?",
    // "Чи бувало таке, щоб ти коли-небудь грубо розмовляв з батьками?",
    // "Чи буває так, що твоє серце починає сильно битися, навіть якщо ти майже не хвилюєшся?",
    // "Тобі подобалася б така робота, де все треба робити дуже швидко?",
    // "Тобі часом сняться страшні сни?",
    // "У тебе часом буває таке відчуття, що тобі все набридло?",
    // "Чи був хоча б раз у твоєму житті випадок, коли тобі було дуже погано?",
    // "Чи буває так, що іноді тебе майже все дратує?",
    // "Тобі подобається перебувати в голосливій та веселій компанії?",
    // "Тобі подобається жартувати і розповідати веселі історії своїм друзям?",
    // "Тобі завжди подобається грати з іншими хлопцями?",
    // "Ти можеш без особливих зусиль розвеселити компанію нудьгуючих?",
    // "Ти любиш часто ходити в гості?",
    // "Ти любиш іноді похвалитися?",
    // "Ти коли-небудь порушував правила поведінки в Коледжі?",
    // "Ти коли-небудь говорив неправду?",
    // "Ти іноді відчуваєш себе втомленим без особливої причини?",
    // "Ти зазвичай швидко приймаєш рішення?",
    // "Ти завжди їж все, що тобі дають?",
    // "Ти завжди виконуєш те, що тобі кажуть?",
    // "Ти жартуєш іноді в групі, особливо якщо там немає вчителя?",
    // "Ти дуже розбудовуєшся, коли тебе дають за що-небудь?",
    // "Тебе взагалі легко образити або засмутити?",
    // "Коли тебе про щось просять, тобі завжди важко відмовляти?",
    // "Коли тебе про що-небудь запитують, ти найчастіше швидко знаходиш відповідь?",
    // "Буваєш ти дуже сердитим, дратівливим?",
    // "Чи буває таке, що тобі не хочеться брати участь в загальному святкуванні?",
    // "Кажеш ти іноді перше, що спадає на думку?",
    // "Буває, що ти відчуваєш себе самотнім?",
    // "Коли хто-небудь кричить на тебе, ти теж кричиш у відповідь?",
    // "На тебе впливає погода?",
    // "Ти зазвичай соромишся заговорити першим з незнайомими людьми?",
    // "Ти майже завжди впевнений, що впораєшся зі справою, за яку взявся?",
    // "Ти часто спохвачуєшся, коли вже пізно?",
    // "Тобі іноді здається, що важко отримати справжнє задоволення від компанії?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    setScore(score + points);
    const next = currentQuestion + 1;

    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  const getResult = (): string => {
    if (score <= 13) return "Інтроверт";
    if (score <= 27) return "Флегматик-інтроверт";
    if (score <= 40) return "Холерик-інтроверт";
    return "Меланхолік-інтроверт";
  };

  return (
    <ImageBackground
      source={{
        uri: "https://media.istockphoto.com/id/2172581181/photo/delicate-background-with-pink-flowers.jpg?s=612x612&w=0&k=20&c=HEKB3e7MP1do6AA_vj180YVJvrD9vcYh3sP97zgZgy4=",
      }}
      resizeMode="cover"
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.container}>
        {!showResult ? (
          <>
            <Text style={styles.question}>
              {currentQuestion + 1}. {questions[currentQuestion]}
            </Text>
            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer(1)}
              >
                <Text style={styles.buttonText}>ТАК</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer(0.5)}
              >
                <Text style={styles.buttonText}>ІНКОЛИ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAnswer(0)}
              >
                <Text style={styles.buttonText}>НІ</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.result}>Ваш темперамент: {getResult()}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/")}
              >
                <Text style={styles.buttonText}>Назад на старт</Text>
              </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 15,
    width: 300,
  },
  question: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: "center",
    textAlign: "center",
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4CAF50",
    margin: 4,
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
