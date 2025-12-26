"use client";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
interface CombinedInterface {
  questionbank: string;
  answerbank: string;
  time? : string;
}

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [questionData, setQuestionData] = useState<CombinedInterface[]>([]);
  const soundRef = React.useRef<HTMLAudioElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const dummyQuestions: CombinedInterface[] = [
    { questionbank: "What is your name?", answerbank: "My name is Abhishek" },
    { questionbank: "How old are you?", answerbank: "I am 21 years old" },
    { questionbank: "Where do you live?", answerbank: "I live in Phagwara" },
    { questionbank: "What is your profession?", answerbank: "I am a web developer" },
    { questionbank: "What is your favorite language?", answerbank: "I like JavaScript" },
    { questionbank: "Which framework do you use?", answerbank: "I use React.js" },
    { questionbank: "Do you like coding?", answerbank: "Yes, I love coding" },
    { questionbank: "What is your hobby?", answerbank: "I like playing outdoor games" },
    { questionbank: "Which stack do you know?", answerbank: "I know MERN stack" },
    { questionbank: "Do you like learning?", answerbank: "Yes, I enjoy learning new things" },
  ];


React.useEffect(() => {
  soundRef.current = new Audio("/notifocation.mpeg");
}, []);

const handelSubmit = () => {
  if (!question.trim()) return;
  const currentTime = new Date().toLocaleTimeString();

  setQuestionData((prev) => [
    ...prev,
    {
      questionbank: question,
      answerbank: "Bot is typing...",
      time: currentTime,
    },
  ]);

  setQuestion("");
  setIsTyping(true);
     
  const found = dummyQuestions.find(
    (item) => item.questionbank.toLowerCase() === question.toLowerCase()
  );

  const answer = found
    ? found.answerbank
    : "Sorry, I don't know the answer.";

  setTimeout(() => {
    setQuestionData((prev) =>
      prev.map((msg, index) =>
        index === prev.length - 1
          ? { ...msg, answerbank: answer }
          : msg
      )
    );
    soundRef.current?.play().catch(err => {
  });

  setIsTyping(false);
  }, 1000);
};


  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Grid size={{xs:12 , sm:6}}> 
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>  
            Ask Question
          </Typography>

         <Paper  sx={{
    mt: 3,
    p: 2,
    height: "400px",          
    overflowY: "auto",        
    border: "1px solid #ccc",
  }}
  elevation={1} >
  {questionData.map((msg, index) => (
    <div key={index}  style={{ marginBottom: "15px" }}>
      <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 1,
  }}
>
  <Paper sx={{ p: 1.5, backgroundColor: "#1976d2", color: "white" }}>
    <Typography variant="body2">
      You ({msg.time}): {msg.questionbank}
    </Typography>
  </Paper>
  <Avatar> <PersonIcon /></Avatar>
</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          mt: 2,
          gap: 1,
        }}
      >
                 <Avatar sx={{ bgcolor: "#4caf50" }}>
    <SmartToyIcon />
  </Avatar>
        <Paper sx={{ p: 1.5, backgroundColor: "#f0f0f0" }}>
   
          <Typography variant="body2">
            Bot ({msg.time}): {msg.answerbank}
          </Typography>
        </Paper>
        
      </Box>
    </div>
  ))}
</Paper>
          <br />
          <Autocomplete
  freeSolo
  options={dummyQuestions.map((item) => item.questionbank)}
  value={question}
  onInputChange={(event, newValue) => setQuestion(newValue)}
  renderInput={(params) => <TextField {...params} label="Ask a question from the suggested list" fullWidth />}
/>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" onClick={handelSubmit}>
              Send
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
