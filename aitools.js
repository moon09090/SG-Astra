// Study Hub AI tools v2: every tool has its own inputs + its own expert prompt, and every answer
(()=>{
// is shown as clean point cards (headings, bullets, steps, tap-to-reveal Q&A, key terms, tables).
const fT=(k,l,p,r)=>({k,t:"t",l,p,r:r||5}),fX=(k,l,p)=>({k,t:"x",l,p}),fS=(k,l,o,d)=>({k,t:"s",l,o,d:d||o[0]}),fN=(k,l,d,mn,mx)=>({k,t:"n",l,d,mn:mn||1,mx:mx||50}),fD=(k,l)=>({k,t:"d",l});
const CLS=["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12","College"],DIF=["Easy","Medium","Hard","Exam-level"],
LNG=["English","Hindi","Hinglish","Spanish","French","Arabic","Bengali","Tamil","Telugu","Urdu"],
TONE=["Formal","Friendly","Confident","Simple"];
const AIX={};const X=(id,f,sys,go)=>{AIX[id]={f,sys,go:go||"✨ Generate"}};
const fL=()=>fS("lang","Reply in",LNG),fC=(d)=>fS("cls","Class / level",CLS,d||"Class 10");
X("sum",[fT("in","Your notes","Paste the chapter or notes…",8),fS("len","Length",["Brief (5 points)","Standard (8–10 points)","Detailed (15+ points)"],"Standard (8–10 points)"),fS("focus","Focus on",["Key ideas","Exam revision","Definitions & facts"]),fL()],
"Summarise ONLY what is in the notes; never add outside facts. Sections: 'Big idea' (1–2 bullets), 'Key points' (the summary, as many bullets as the length asks), 'Key terms' (kind terms), 'Remember for the exam' (3 bullets).");
X("eli",[fX("in","Topic or concept","e.g. photosynthesis, inflation, recursion"),fS("age","Explain it like I’m",["8 years old","12 years old","16 years old","a complete beginner adult"],"12 years old"),fS("style","Style",["Everyday analogy","Short story","Step by step"]),fL()],
"Sections: 'In one line', 'The analogy' (a vivid everyday comparison), 'How it really works' (kind steps), 'Real-life example', 'Check yourself' (kind qa with 2 questions).");
X("quiz",[fT("in","Topic or notes","Topic, or paste notes to be quizzed on…",4),fN("n","Number of questions",10,3,30),fS("dif","Difficulty",DIF,"Medium"),fS("typ","Question type",["MCQ (4 options)","True / False","Fill in the blank","Mixed"]),fC()],
"Make exactly the requested number of questions at the requested difficulty and class. One section 'Questions' of kind qa; each point is 'question text (for MCQ include options A) … B) … C) … D) … in the same line) :: Answer — one-line explanation'. Then a section 'Score guide' (bullets: how to rate yourself).");
X("fc",[fT("in","Topic or notes","What do you want to memorise?",4),fN("n","Number of cards",15,5,40),fS("side","Card style",["Question → Answer","Term → Meaning","Fill in the blank"]),fC()],
"Create flashcards. Section 'Flashcards' of kind qa with 'front :: back'; fronts are short, backs are one clear sentence. Add a section 'How to study these' (3 bullets on spaced repetition).");
X("plan",[fD("exam","Exam date"),fT("in","Subjects and weak areas","e.g. Maths (weak in trigonometry), Physics, English",4),fN("hrs","Study hours per day",3,1,12),fS("start","Preparation so far",["Not started","Half done","Only revision left"])],
"Build a realistic day-by-day plan from today until the exam date (if no date is given assume 4 weeks). Sections: 'Overview' (strategy), one section per week (kind steps; each point 'Day — subject — task — minutes'), 'Revision & rest days', 'Last 3 days before the exam'.","🗓️ Build my plan");
X("ttable",[fT("in","Subjects and school / tuition hours","e.g. School 8–2, Tuition Mon/Wed 5–7. Subjects: Maths, Science, English",4),fX("wake","Wake-up time","6:00 AM"),fX("sleep","Sleep time","10:30 PM"),fN("hrs","Self-study hours",3,1,10),fS("goal","Goal",["Balanced day","Exam rush","Weak subjects first"])],
"Make a daily timetable. Section 'Your day' of kind table with header 'Time | Activity | Why' and one row per block (include meals, breaks, exercise, sleep). Then 'Habits that make it work' (4 bullets).","⏰ Make timetable");
X("outline",[fX("in","Essay topic","e.g. Social media and teenagers"),fS("typ","Essay type",["Argumentative","Descriptive","Narrative","Analytical","Expository"]),fN("w","Target word count",500,100,2000),fC()],
"Write a clear essay outline. Sections: 'Thesis', 'Introduction' (hook, context, thesis), 'Body paragraph 1', 'Body paragraph 2', 'Body paragraph 3' (each: topic sentence, evidence, example), 'Conclusion', 'Words per part' (kind table 'Part | Words').");
X("efb",[fT("in","Your essay","Paste your essay…",9),fX("topic","Essay question (optional)","What was the essay about?"),fS("rub","Mark it like",["School exam","IELTS / TOEFL","College"])],
"Be kind but specific. Sections: 'Your scores' (bullets 'Overall: x/10', 'Structure: x/10', 'Grammar: x/10', 'Ideas: x/10', 'Vocabulary: x/10'), 'What works well', 'Fix these 3 things' (kind steps; each quotes the weak sentence then shows a better version), 'A stronger opening line'.","🧑‍🏫 Give feedback");
X("gram",[fT("in","Your text","Paste your text…",7),fS("mode","What should I do?",["Fix mistakes only","Fix and polish","Make it formal","Make it friendly"]),fS("eng","English style",["Indian English","British","American"])],
"Sections: 'Corrected text' (ONE point with the full corrected text), 'What I changed' (points 'before → after — the rule'), 'Rule to remember' (1–2 bullets).","✅ Fix my text");
X("para",[fT("in","Your text","Paste your text…",7),fS("tone","Tone",["Simple","Formal","Academic","Friendly"]),fS("ver","How many versions",["2","3","1"])],
"Paraphrase keeping the meaning. One section per version ('Version 1' …) each with one point. Then 'What I changed' (3 bullets). Never copy sentences unchanged.","🔄 Paraphrase");
X("trans",[fT("in","Text to translate","Type or paste the text…",5),fS("to","Translate to",["Hindi","English","Spanish","French","Arabic","Bengali","Tamil","Telugu","Urdu","German","Japanese","Korean"],"Hindi"),fS("tone","Tone",["Natural","Formal","Casual"])],
"Sections: 'Translation' (one point), 'How to say it' (Roman-letter pronunciation, ONLY if the target script is not Latin), 'Key words' (kind terms 'word :: meaning'), 'Other ways to say it' (2 bullets).","🌐 Translate");
X("math",[fT("in","Maths problem","Type or paste the problem…",4),fC(),fS("meth","Method",["Step by step","Shortcut / trick","Two different methods"]),fL()],
"Solve fully. Sections: 'Given', 'To find', 'Solution' (kind steps: each step states the action then the result), 'Final answer' (one point), 'Quick check' (verify), 'Common mistake'. Use plain text maths like x^2, sqrt(), fractions as a/b.","➗ Solve");
X("phy",[fT("in","Physics problem","Type or paste the problem…",4),fC("Class 11"),fS("type","Type",["Numerical","Conceptual","Derivation"]),fL()],
"Sections: 'Given (with units)', 'Unknown', 'Formula used and why', 'Solution' (kind steps, units in every step), 'Answer with units', 'The concept behind it'.","⚛️ Solve");
X("chem",[fT("in","Reaction, concept or problem","e.g. balance Fe + O2 → Fe2O3",4),fS("kind","What do you need?",["Explain a concept","Balance an equation","Numerical problem","Organic reaction","Periodic trends"]),fC("Class 11"),fL()],
"Answer for the chosen kind. Sections: 'Answer' (kind steps when it is a process), 'Why it happens', 'Key terms' (kind terms), 'Memory tip'. For equations show the balanced equation clearly.","🧪 Explain");
X("bio",[fX("in","Biology topic","e.g. Krebs cycle, human heart"),fC(),fS("exam","Prepare for",["School exam","NEET","Olympiad"]),fL()],
"Sections: 'Overview', 'Diagram in words' (kind steps describing what to draw and label), 'Key terms' (kind terms), 'Mnemonic', 'Exam questions' (kind qa, 3 questions).","🧬 Explain");
X("hist",[fX("in","Event, era or country","e.g. French Revolution, Mughal Empire"),fS("view","Show me",["Dates & events","Causes & effects","Key people"]),fN("n","Number of entries",10,5,25),fC()],
"Section 'Timeline' of kind table with header 'Year | What happened | Why it mattered'. Then 'Causes and effects' (bullets) and 'Exam questions' (kind qa, 3 questions).","🏺 Build timeline");
X("geo",[fX("in","Place or topic","e.g. Himalayas, monsoon, Brazil"),fS("focus","Focus on",["Overview","Climate","Economy","Map location & features"]),fC()],
"Sections: 'Quick facts' (kind terms 'fact :: value'), 'Where it is' (location in words), 'Climate', 'Economy and people', 'Exam questions' (kind qa, 3 questions).");
X("mnem",[fT("in","Things to remember","e.g. the planets in order, 7 colours of rainbow",4),fS("kind","Style",["Acronym","Silly sentence","Rhyme","All three"],"All three")],
"Sections: 'Mnemonics' (one point per mnemonic, label it with its style), 'How it maps' (kind terms 'letter or word :: item'), 'How to lock it in' (2 bullets).","🔤 Make mnemonics");
X("palace",[fT("in","What do you need to memorise?","List the items in order…",4),fX("place","A place you know well","e.g. my house, my school"),fN("n","Number of stops",8,3,15)],
"Build a memory palace. Section 'Your route' of kind steps; each point 'Stop N: location — vivid, funny image — the item it stands for'. Then 'Recall practice' (3 bullets).","🏰 Build palace");
X("mind",[fX("in","Topic","e.g. Indian Constitution"),fS("depth","Depth",["2 levels","3 levels"]),fN("br","Main branches",5,3,8)],
"Make a text mind map. One section per main branch (heading = the branch); points are its sub-branches (indent depth with ' — '). First section 'Centre' with the central idea.","🕸️ Build map");
X("cornell",[fT("in","Lecture or chapter notes","Paste your notes…",8),fC()],
"Convert into Cornell format. Sections: 'Cue questions and notes' (kind qa, 'cue question :: the matching notes'), 'Summary' (3 bullets).");
X("gloss",[fT("in","Chapter or notes","Paste the chapter or name the topic…",5),fN("n","Number of terms",15,5,30),fS("def","Definitions",["Simple","Exam-style"])],
"Section 'Glossary' of kind terms ('term :: definition'), alphabetical. Then 'Terms most likely in exams' (3 bullets).","📚 Make glossary");
X("comp",[fX("a","First thing","e.g. Mitosis"),fX("b","Second thing","e.g. Meiosis"),fS("angle","Compare",["Overall","Exam differences","Pros and cons"])],
"Sections: 'Side by side' (kind table: header 'Point | <first> | <second>', 6–8 rows), 'Similarities' (3 bullets), '3 key takeaways'.","⚖️ Compare");
X("debate",[fX("in","Motion or topic","e.g. Homework should be banned"),fS("side","Side",["Both sides","For only","Against only"]),fS("lvl","Level",["School debate","College","Parliamentary"])],
"Sections: 'For' and 'Against' (as requested): 4 strong arguments each, every point 'argument — one-line rebuttal the other side will use'. Then 'Opening line' and 'Closing line'.","🗣️ Build case");
X("thesis",[fT("in","Your essay idea","What is your essay about and what do you believe?",4),fS("typ","Essay type",["Argumentative","Analytical","Expository"]),fC()],
"Sections: 'Three thesis options' (one point each), 'Best one and why' (2 bullets), 'How to test your thesis' (3 bullets).","🎯 Write thesis");
X("cite",[fT("in","Source details","Author, title, year, publisher or website, URL…",4),fS("sty","Format",["APA 7","MLA 9","Harvard","All three"],"All three"),fS("type","Source type",["Book","Website","Journal article","YouTube video","News article"])],
"Sections: one section per format requested, each with the finished citation as one point and the in-text citation as a second point. Then 'Missing details' (what to look up if info is missing).","📎 Make citation");
X("slides",[fX("in","Topic","e.g. Climate change solutions"),fX("aud","Audience","e.g. Class 10 students"),fN("n","Number of slides",8,4,20),fS("tone","Tone",["Informative","Persuasive","Fun"])],
"Section per slide named 'Slide N — title'; points: 3 short on-slide bullets, then 'Say:' with a speaker note. First slide is the title slide; last is 'Questions'.","🖥️ Build slides");
X("speech",[fX("occ","Occasion","e.g. Annual day, farewell, debate"),fT("in","Key points to include","What must the speech say?",4),fN("min","Length (minutes)",2,1,10),fS("tone","Tone",["Inspiring","Funny","Formal","Emotional"])],
"Sections: 'Opening hook', 'Main speech' (the full text split into short paragraphs as points), 'Closing line', 'Delivery tips' (3 bullets: pauses, gestures).","🎤 Write speech");
X("rc",[fT("in","Passage","Paste the passage…",8),fN("n","Number of questions",8,3,15),fS("kinds","Question types",["Mixed","Literal","Inference","Vocabulary"]),fS("dif","Difficulty",DIF,"Medium")],
"Section 'Questions' of kind qa ('question :: answer — where in the passage'). Then 'Vocabulary from the passage' (kind terms) and 'Main idea in one line'.","📖 Make questions");
X("words",[fX("in","Exam or topic","e.g. IELTS, GRE, class 10 English, business"),fN("n","Number of words",15,5,30),fS("lvl","Difficulty",["Easy","Medium","Hard"],"Medium")],
"Section 'Words' of kind qa where each point is 'word :: meaning — example sentence — synonyms'. Then 'Practice sentence' (1 task).","🔡 Build vocabulary");
X("ielts",[fX("in","Topic (optional)","e.g. Hometown, technology, a memorable trip"),fS("part","Part",["Part 1","Part 2","Part 3","All parts"]),fS("band","Target band",["6","7","8"],"7")],
"Give speaking prompts for the chosen part(s). Section per prompt: points 'Prompt', 'Model answer', 'Why this scores band X' (the examiner's criteria), 'Useful phrases'. Model answers must be natural and match the target band.","🎙️ Practise");
X("email",[fT("in","Key points","Who, why and what you need to say…",5),fX("to","Who is it for","e.g. My principal, a recruiter"),fS("tone","Tone",["Formal","Polite and friendly","Firm"]),fS("len","Length",["Short","Medium"])],
"Sections: 'Subject line' (3 options), 'Email' (the full email, one paragraph per point), 'Before you send' (3 bullets).","✉️ Write email");
X("proj",[fX("in","Subject","e.g. Physics, Social Science"),fC(),fS("type","Project type",["Working model","Chart or poster","Experiment","Research report"]),fN("n","Ideas",8,3,12)],
"One section per idea (heading = idea name); points: 'What you will make', 'Materials', 'Steps in brief', 'What you will learn', 'Difficulty'.","💡 Get ideas");
X("sci",[fX("in","Your interest","e.g. electricity, plants, space"),fC(),fN("n","Ideas",6,3,10)],
"One section per project (heading = title); points: 'Question you test', 'Hypothesis', 'Materials', 'Method' , 'What to measure', 'Safety'.","🔬 Get ideas");
X("riddle",[fX("in","Topic","e.g. maths, animals, logic"),fN("n","How many",6,3,12),fS("dif","Difficulty",DIF.slice(0,3),"Medium")],
"Section 'Brain teasers' of kind qa ('riddle :: answer — short explanation'). Add 'Hint ladder' (one hint per riddle, vague → clear) as a second section.","🧩 Challenge me");
X("tldr",[fT("in","Long text","Paste a long text…",9),fS("len","Result",["3 sentences","Tweet-length","One paragraph"])],
"Sections: 'TL;DR' (the requested length, ONE point), 'Key points' (5 bullets), 'Who should read the full text'.","⚡ Shorten");
X("code",[fT("in","Code","Paste your code…",8),fS("lang","Language",["Auto-detect","Python","JavaScript","Java","C / C++","HTML / CSS","SQL"]),fS("lvl","Explain for",["Beginner","Intermediate"])],
"Sections: 'What it does' (1–2 bullets), 'Line by line' (kind steps, quoting each code line or block then explaining), 'Key ideas' (kind terms), 'Sample output' , 'How to improve it' (3 bullets).","💻 Explain");
X("debug",[fT("in","Your code","Paste your code…",8),fT("err","Error message or what goes wrong","Paste the error…",3)],
"Sections: 'The bug' (what is wrong and why, simple), 'Fixed code' (ONE point containing the full corrected code), 'What I changed' (bullets), 'How to avoid it next time'.","🐞 Find the bug");
X("sql",[fT("in","What data do you want?","Describe it in plain words…",4),fX("schema","Tables and columns (optional)","students(id, name, marks)"),fS("db","Database",["MySQL","PostgreSQL","SQLite","SQL Server"])],
"Sections: 'SQL query' (ONE point with the query), 'How it works' (kind steps, clause by clause), 'Sample result' (kind table), 'Variations' (2 bullets).","🗄️ Write SQL");
X("excel",[fT("in","What should it calculate?","Describe in plain words…",4),fS("app","App",["Excel","Google Sheets"]),fX("cols","Your columns (optional)","A = Name, B = Marks")],
"Sections: 'Formula' (ONE point), 'How it works' (kind steps), 'Example' (kind table), 'Alternative formula'.","🧮 Get formula");
X("practice",[fX("in","Topic","e.g. Quadratic equations"),fC(),fN("n","Number of problems",10,3,25),fS("dif","Difficulty",DIF,"Medium"),fS("typ","Type",["Mixed","Numerical","Conceptual"])],
"Section 'Practice problems' of kind qa ('problem :: answer with short working'). Order easy to hard. Then 'Concepts tested'.","🏋️ Make problems");
X("pyq",[fX("in","Subject and chapter","e.g. Science — Light"),fS("board","Exam",["CBSE","ICSE","State board","JEE","NEET"]),fS("marks","Marks per question",["1","2","3","5"],"3"),fN("n","Questions",6,3,15)],
"Section 'Exam-style questions' of kind qa ('question (marks) :: model answer + marking points'). Then 'How examiners award marks' (3 bullets).","📝 Get questions");
X("ans",[fT("in","Question and your answer","Question: …  My answer: …",8),fS("marks","Question carries",["2 marks","3 marks","5 marks"],"3 marks")],
"Sections: 'Estimated marks' (one point 'x out of y' + why), 'What you missed' (bullets), 'Model answer' (kind steps), 'How to present it' (3 bullets on keywords, diagrams, structure).","📝 Improve answer");
X("analogy",[fX("in","Concept","e.g. electric current, GDP"),fS("for","Explain for",["School kid","Teenager","Adult beginner"],"Teenager"),fN("n","Analogies",3,2,5)],
"One section per analogy (heading = the analogy); points: 'The comparison', 'How it maps to the concept', 'Where the analogy breaks down'.","🔗 Find analogies");
X("resume",[fT("in","Your experience and skills","Projects, internships, school achievements, skills…",6),fX("role","Target role","e.g. Software intern"),fS("lvl","You are",["Student","Fresher","1–3 years"])],
"Sections: 'Strong bullets' (8 bullets each starting with an action verb and including a number or result where possible), 'Skills section' , 'Summary line', 'Mistakes to avoid'.","📄 Write bullets");
X("cover",[fX("role","Role","e.g. Content intern"),fX("co","Company","e.g. Acme Pvt Ltd"),fT("in","Your highlights","Skills, projects, why you want this…",5),fS("tone","Tone",TONE)],
"Sections: 'Cover letter' (the full letter, one paragraph per point; under 250 words), 'Subject line', 'Tailoring tips' (3 bullets).","✉️ Write letter");
X("interview",[fX("in","Role you are applying for","e.g. Bank PO, Data analyst"),fS("type","Round",["HR round","Technical","Campus","Group discussion"]),fN("n","Questions",6,3,12)],
"Section 'Practice questions' of kind qa ('question :: how to answer — a strong sample answer'). Then 'Questions to ask the interviewer' and 'Body language tips'.","🎯 Practise");
X("career",[fT("in","Your interests and strengths","What do you enjoy? What are you good at?",5),fS("stage","You are in",["Class 9–10","Class 11–12","College","Working"]),fX("goal","Anything you already have in mind (optional)","")],
"Sections: 'Top 3 paths for you' (one point each: why it fits), 'Roadmap' (kind steps by year), 'Skills to build now', 'Exams or courses to look at', 'First step this week'. Be honest about effort and uncertainty.","🧭 Plan career");
X("sch",[fT("in","Your story","Background, achievements, challenges, goals…",6),fX("sch","Scholarship","Name and what it values"),fN("w","Word limit",400,150,1000)],
"Sections: 'Essay' (full essay in short paragraphs, within the word limit, in the student's own honest voice, no invented facts), 'Why this works' (3 bullets), 'Things to double-check'.","🎓 Write essay");
X("bio2",[fT("in","Your background","Studies, skills, interests, goals…",5),fS("where","For",["LinkedIn About","Resume summary","Instagram bio","College application"]),fS("tone","Tone",TONE)],
"Sections: 'Option 1', 'Option 2', 'Option 3' (each ONE point, written for the chosen platform and length limits), 'How to pick'.","✍️ Write bio");
X("tm",[fT("in","Describe your week and problems","School, tuition, hobbies, what goes wrong…",6),fN("hrs","Free hours per day",3,0,10)],
"Sections: 'What is going wrong' (bullets), 'Your new weekly rhythm' (kind table 'Day | Focus | Hours'), 'Three rules for you', 'Weekly review' (3 questions).","⏱️ Coach me");
X("proc",[fT("in","What are you avoiding?","The task you keep putting off…",4),fS("why","Why do you avoid it?",["It feels boring","It feels overwhelming","I fear failing","I get distracted"])],
"Be warm and practical. Sections: 'Why this happens' (1–2 bullets), 'Start in 2 minutes' (kind steps), 'Make it easier' (3 bullets), 'Rewards' , 'If you slip' (1 bullet).","🚀 Help me start");
X("stress",[fT("in","How are you feeling?","Tell me what is on your mind…",5),fS("when","When",["Before exams","During exam week","After a bad result","Always"])],
"Be calm, kind and non-clinical. Sections: 'What you are feeling is normal', 'Right now' (kind steps: a 2-minute breathing or grounding exercise), 'Study smarter, not harder' (3 bullets), 'Tonight' (3 bullets). If the student mentions hopelessness, self-harm or serious distress, gently urge them to talk to a trusted adult or a counsellor today.","🌿 Calm me");
X("motiv",[fT("in","Your goal and what is hard","What do you want and what is in the way?",5),fS("mood","Right now I feel",["Tired","Stuck","Nervous","Distracted","Just need a push"],"Just need a push")],
"Sections: 'Remember why', 'Your next small win' (kind steps for the next 24 hours), 'When it gets hard' (3 bullets), 'A line to repeat'. Warm, never preachy.","🔥 Motivate me");
X("doubt",[fT("in","Your doubt","Type your doubt…",5),fS("subj","Subject",["Maths","Physics","Chemistry","Biology","English","Social Science","Computer","Other"],"Maths"),fC(),fS("depth","Answer style",["Short answer","Step by step","Deep explanation"],"Step by step"),fL()],
"Answer for the subject and class. Sections: 'Short answer', 'Explanation' (kind steps), 'Example', 'Remember' (2 bullets), 'Try this' (kind qa, 1 practice question).","❓ Solve doubt");

X("bookS",[fX("in","Book title","e.g. Wings of Fire, Animal Farm"),fX("au","Author (optional)","e.g. A. P. J. Abdul Kalam"),fC(),fL()],
"Sections: 'Plot in short' (5–6 bullets, no spoilers beyond what a summary needs), 'Characters' (kind terms 'name :: role and traits'), 'Themes' (bullets), 'Famous ideas or lines' (paraphrase, do not quote at length), 'Exam questions' (kind qa, 5 questions with model answers).","📕 Summarise book");


const EX={sum:{in:"Photosynthesis is how green plants make food. Chlorophyll in the leaves absorbs sunlight. The plant takes in carbon dioxide through stomata and water through roots. Using light energy it turns these into glucose and releases oxygen. The glucose gives the plant energy and is stored as starch."},
eli:{in:"Why is the sky blue?"},quiz:{in:"Fractions and decimals",n:"5",dif:"Medium"},fc:{in:"Parts of a plant cell",n:"10"},plan:{in:"Maths (weak in algebra), Science, English. School till 2 pm.",hrs:"3"},
ttable:{in:"School 8 to 2. Tuition Mon/Wed 5 to 7 pm. Subjects: Maths, Science, English, Hindi"},outline:{in:"Social media and teenagers"},
efb:{in:"Technology has changed our lives a lot. Mobile phones is very useful for study but also waste time. In my opinion we should use it wisely and not become addicted to it."},
gram:{in:"Me and my friend goes to school by bus everyday and we was never late."},para:{in:"Regular exercise improves both physical health and mental well-being."},
trans:{in:"Good morning! How are you today?",to:"Hindi"},math:{in:"Solve: 2x + 5 = 17, then find x squared."},phy:{in:"A car speeds up from 10 m/s to 30 m/s in 5 seconds. Find its acceleration and distance covered."},
chem:{in:"Balance: Fe + O2 → Fe2O3",kind:"Balance an equation"},bio:{in:"Human heart and blood circulation"},hist:{in:"French Revolution",n:"8"},geo:{in:"Himalayas"},
mnem:{in:"Planets of the solar system in order"},palace:{in:"Mitochondria, Nucleus, Ribosome, Golgi body, Lysosome",place:"My house"},mind:{in:"Indian Constitution"},
cornell:{in:"The Mughal empire was founded by Babur in 1526 after the First Battle of Panipat. Akbar expanded it and followed a policy of religious tolerance."},
gloss:{in:"Electricity"},comp:{a:"Mitosis",b:"Meiosis"},debate:{in:"Homework should be banned"},thesis:{in:"Schools should start later in the morning because teenagers need more sleep."},
cite:{in:"Wings of Fire, A. P. J. Abdul Kalam, Universities Press, 1999"},slides:{in:"Climate change solutions",aud:"Class 10 students"},
speech:{occ:"School annual day",in:"Thank teachers, celebrate achievements, motivate juniors"},rc:{in:"The Amazon rainforest, often called the lungs of the Earth, produces a large share of the world's oxygen. It is home to millions of species, but deforestation is shrinking it every year."},
words:{in:"Class 10 English"},ielts:{in:"A memorable trip"},email:{in:"Ask my teacher for a two-day leave because of a family function",to:"My class teacher"},proj:{in:"Science"},sci:{in:"Electricity"},
riddle:{in:"Maths"},tldr:{in:"Climate change refers to long-term shifts in temperatures and weather patterns. Since the 1800s human activities, mainly burning fossil fuels, have been the main driver of climate change, raising temperatures and causing more extreme weather."},
code:{in:"for i in range(1,6):\n    print(i*i)"},debug:{in:"nums=[1,2,3]\nprint(nums[3])",err:"IndexError: list index out of range"},sql:{in:"Show the names of students who scored more than 80 marks",schema:"students(id, name, marks)"},
excel:{in:"Sum of marks in column B only if the name in column A is Asha"},practice:{in:"Quadratic equations",n:"5"},pyq:{in:"Science — Light, reflection and refraction"},ans:{in:"Question: What is photosynthesis? My answer: Plants make food from sunlight."},
analogy:{in:"Electric current"},resume:{in:"Class 12 topper, school coding club lead, built a quiz app, volunteer at a food drive",role:"Software intern"},cover:{role:"Content intern",co:"Acme Pvt Ltd",in:"Good writing, school magazine editor, creative"},
interview:{in:"Bank PO"},career:{in:"I like maths and drawing, and I enjoy solving puzzles."},sch:{in:"I topped my school while helping at my father's shop and want to study engineering.",sch:"Merit scholarship"},
bio2:{in:"Class 12 science student, loves coding and chess, wants to build useful apps"},tm:{in:"I study late at night, miss tuition homework, and waste time on my phone."},proc:{in:"Starting my maths revision"},
stress:{in:"I have exams next week and I feel I can't finish the syllabus."},motiv:{in:"I want to score 90% in Class 10 but I feel tired and stuck."},doubt:{in:"Why does ice float on water?",subj:"Physics"},bookS:{in:"Wings of Fire"}};
const VC={Hindi:"hi-IN",Hinglish:"en-IN",English:"en-US",Spanish:"es-ES",French:"fr-FR",Arabic:"ar-SA",Bengali:"bn-IN",Tamil:"ta-IN",Telugu:"te-IN",Urdu:"ur-PK",German:"de-DE",Japanese:"ja-JP",Korean:"ko-KR"};
const HK="sga_aih";const aiHist=()=>{try{return JSON.parse(localStorage.getItem(HK)||"[]")}catch(x){return[]}};
function aiSaveHist(id,u,r){try{const h=aiHist();h.unshift({id,u:String(u||"").slice(0,80),r});localStorage.setItem(HK,JSON.stringify(h.slice(0,24)))}catch(x){}}
function HaiEx(id){const x=EX[id];if(!x)return;Object.keys(x).forEach(k=>HaiSet(id,k,x[k]));R();HaiRun(id)}
function HaiHist(i){const h=aiHist()[i];if(!h)return;S.hc={id:h.id,m:[],r:[h.r],u:[""]};R()}
function HaiShare(){const t=aiLast();if(!t)return;if(navigator.share)navigator.share({title:"SG Astra",text:t}).catch(()=>{});else HaiCopy()}
const REFINE=[["Shorter","Make it shorter and more to the point."],["More detail","Explain in more detail with more points."],["Simpler words","Explain again in simpler words."],["More examples","Add more examples."],["Make it harder","Make it more challenging and advanced."]];

const SCHEMA=`Reply with ONLY valid JSON (no markdown fences, no text outside the JSON) in exactly this shape: {"title":"short title","overview":"one friendly sentence","sections":[{"h":"Heading","icon":"one emoji","kind":"bullets|steps|qa|terms|table","pts":["short point"]}],"tip":"one useful tip"}. Rules: every point is a short clear sentence (max 28 words); kind "qa" points are "question :: answer"; kind "terms" points are "term :: meaning"; kind "table": first point is the header "A | B | C" and every other point is a row with the same columns; kind "steps" points are in order; use plain text (**bold** only for key words); no LaTeX, no HTML.`;
const AIXfb=a=>({f:[fT("in",a[2],a[3],6),fS("depth","Detail",["Short","Standard","Detailed"],"Standard"),fL()],sys:(a[4]||"")+" Organise the answer into 3–6 sections with clear headings.",go:"✨ Ask AI"});
const aix=a=>AIX[a[0]]||AIXfb(a);
const today2=()=>new Date().toISOString().slice(0,10);
const aiMd=s=>e(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`([^`]+)`/g,"<code>$1</code>");

// ---- parsing
function aiFromText(t){const secs=[];let cur=null;const push=()=>{if(cur&&cur.pts.length)secs.push(cur)};
 String(t).replace(/\r/g,"").split("\n").forEach(l=>{l=l.trim();if(!l)return;
  const h=l.match(/^#{1,4}\s*(.+)$/)||l.match(/^\*\*(.{2,60}?)\*\*:?$/)||l.match(/^([A-Z][^.!?]{2,50}):$/);
  if(h){push();cur={h:h[1].replace(/\*+/g,"").trim(),kind:"bullets",pts:[]};return}
  const b=l.replace(/^([-*•]|\d+[.)])\s+/,"");if(!cur)cur={h:"Answer",kind:"bullets",pts:[]};cur.pts.push(b)});
 push();return{title:"",overview:"",sections:secs.length?secs:[{h:"Answer",kind:"bullets",pts:[String(t)]}],tip:""}}
function aiNorm(o){if(!o||typeof o!="object")return aiFromText(String(o));
 const sec=(Array.isArray(o.sections)?o.sections:[]).map(s=>({h:String(s.h||s.heading||"Answer"),icon:s.icon||"",kind:/^(steps|qa|terms|table)$/.test(s.kind)?s.kind:"bullets",
  pts:(Array.isArray(s.pts)?s.pts:Array.isArray(s.points)?s.points:[]).map(p=>typeof p=="string"?p:(p&&typeof p=="object"?Object.values(p).join(" — "):String(p)))})).filter(s=>s.pts.length);
 return sec.length?{title:String(o.title||""),overview:String(o.overview||""),sections:sec,tip:String(o.tip||"")}:aiFromText(JSON.stringify(o))}
function aiParseOut(raw){try{return aiNorm(aiParse(raw))}catch(x){return aiFromText(raw)}}
const aiFlat=r=>[r.title,r.overview,...r.sections.map(s=>"\n"+s.h+"\n"+s.pts.map((p,i)=>(s.kind=="steps"?(i+1)+". ":"• ")+p.replace(/ :: /g," — ")).join("\n")),r.tip?"\nTip: "+r.tip:""].filter(Boolean).join("\n");

// ---- rendering
const SIC={bullets:"✦",steps:"🪜",qa:"❓",terms:"🔑",table:"📊"};
function aiSec(s,i){let b="";const k=s.kind;
 if(k=="steps")b=`<ol class="aistep">${s.pts.map(p=>`<li>${aiMd(p)}</li>`).join("")}</ol>`;
 else if(k=="qa")b=s.pts.map(p=>{const j=p.indexOf(" :: "),q=j<0?p:p.slice(0,j),a=j<0?"":p.slice(j+4);return`<details class="aiqa"><summary>${aiMd(q)}</summary>${a?`<div>${aiMd(a)}</div>`:""}</details>`}).join("");
 else if(k=="terms")b=`<div class="aiterms">${s.pts.map(p=>{const j=p.indexOf(" :: ");return j<0?`<div class="aiterm"><span>${aiMd(p)}</span></div>`:`<div class="aiterm"><b>${aiMd(p.slice(0,j))}</b><span>${aiMd(p.slice(j+4))}</span></div>`}).join("")}</div>`;
 else if(k=="table"){const R=s.pts.map(p=>p.split("|").map(x=>x.trim()));const H=R.shift()||[];b=`<div class="aitbw"><table class="aitb"><tr>${H.map(h=>`<th>${aiMd(h)}</th>`).join("")}</tr>${R.map(r=>`<tr>${r.map(c=>`<td>${aiMd(c)}</td>`).join("")}</tr>`).join("")}</table></div>`}
 else b=`<ul class="aipts">${s.pts.map(p=>`<li>${aiMd(p)}</li>`).join("")}</ul>`;
 return`<div class="aisec" id="ais${i}"><div class="aish2"><span>${e(s.icon||SIC[k])}</span>${aiMd(s.h)}</div>${b}</div>`}
const aiRes=r=>`<div class="air">${r.title?`<div class="airt">${aiMd(r.title)}</div>`:""}${r.overview?`<div class="airo">${aiMd(r.overview)}</div>`:""}${r.sections.length>2?`<div class="ainav">${r.sections.map((s,i)=>`<button class="g" onclick="document.getElementById('ais${i}').scrollIntoView({behavior:'smooth',block:'start'})">${aiMd(s.h)}</button>`).join("")}</div>`:""}${r.sections.map(aiSec).join("")}${r.tip?`<div class="aitip">💡 ${aiMd(r.tip)}</div>`:""}</div>`;
// chat-style rich text for the floating AI helper
function aiRich(t){const r=aiFromText(t);return r.sections.map(s=>`${s.h!="Answer"?`<div class="aish2" style="margin:8px 0 2px">${aiMd(s.h)}</div>`:""}<ul class="aipts">${s.pts.map(p=>`<li>${aiMd(p)}</li>`).join("")}</ul>`).join("")}

// ---- form + run
const HaiVal=(id,k,d)=>{const v=(S.haf&&S.haf[id]&&S.haf[id][k]);return v==null||v===""?d:v};
function HaiSet(id,k,val){S.haf=S.haf||{};(S.haf[id]=S.haf[id]||{})[k]=val}
const aiField=(id,f,i)=>{const val=HaiVal(id,f.k,f.t=="s"?f.d:(f.t=="n"?f.d:"")),on=`oninput="HaiSet('${id}','${f.k}',this.value)"`,full=(f.t=="t"||(i==0)?" full":"");
 let c;if(f.t=="t")c=`<textarea id="aif_${f.k}" rows="${f.r}" placeholder="${e(f.p||"")}" ${on}>${e(val)}</textarea>`;
 else if(f.t=="s")c=`<select id="aif_${f.k}" onchange="HaiSet('${id}','${f.k}',this.value)">${f.o.map(o=>`<option ${o==val?"selected":""}>${e(o)}</option>`).join("")}</select>`;
 else if(f.t=="n")c=`<input id="aif_${f.k}" type="number" min="${f.mn}" max="${f.mx}" value="${e(val)}" ${on}>`;
 else if(f.t=="d")c=`<input id="aif_${f.k}" type="date" value="${e(val)}" ${on}>`;
 else c=`<input id="aif_${f.k}" placeholder="${e(f.p||"")}" value="${e(val)}" ${on}>`;
 return`<div class="aif${full}"><label>${e(f.l)}</label>${c}</div>`};
function HaiV(a){const id=a[0],sp=aix(a),C=S.hc&&S.hc.id==id?S.hc:null,last=C&&C.r.length?C.r[C.r.length-1]:null;
 return`<div class="card aitool glass"><div class="aihead"><span class="aiic" style="--ah:${(a[0].split("").reduce((s,c)=>s+c.charCodeAt(0),0)*47)%360}">${a[1]}</span><div><h3>${e(a[2])}</h3><small class="mut">${e(a[3]||"")}</small></div></div><div class="aifs">${sp.f.map((f,i)=>aiField(id,f,i)).join("")}</div><button class="aigo" onclick="HaiRun('${id}')" ${S.hbusy?"disabled":""}>${S.hbusy?"Thinking…":sp.go}</button><div class="aiex">${EX[id]?`<button class="g" onclick="HaiEx('${id}')">✨ Try an example</button>`:""}${aiHist().map((h,i)=>({h,i})).filter(x=>x.h.id==id).slice(0,4).map(x=>`<button class="g" onclick="HaiHist(${x.i})">🕘 ${e(x.h.u.slice(0,22)||"Recent")}</button>`).join("")}</div>${AIKEY()?"":"<small class='mut'>The AI isn’t switched on yet. Ask your admin to add the API key.</small>"}</div>`
 +(S.hbusy&&S.hbusy==id?`<div class="card aisk"><i></i><i></i><i></i><i></i></div>`:"")
 +(C?C.r.map((r,i)=>(i>0&&C.u[i]?`<div class="aiu">You: ${e(C.u[i])}</div>`:"")+aiRes(r)).join(""):"")
 +(last?`<div class="card aiacts"><div class="chips"><button onclick="HaiCopy()">📋 Copy</button><button class="g" onclick="HaiSpeak()">🔊 Listen</button><button class="g" onclick="stopSpeak&&stopSpeak()">🔇 Stop</button><button class="g" onclick="HaiShare()">📤 Share</button><button class="g" onclick="HaiReport()">⚑ Report</button><button class="g" onclick="HaiNote()">⭐ Save to Notes</button><button class="g" onclick="HaiRun('${id}')">🔁 Redo</button><button class="g" onclick="S.hc=null;R()">✕ Clear</button></div><div class="airef">${REFINE.map((x,i)=>`<button class="g" onclick="HaiRefine('${id}',${i})">${x[0]}</button>`).join("")}</div><label>Ask a follow-up</label><div class="row nw"><input id="aifu" placeholder="e.g. make it shorter, explain step 2, give another example"><button class="sq" onclick="HaiRun('${id}',1)">Send</button></div></div>`:"")}
async function HaiRun(id,follow){const a=AIALL.find(x=>x[0]==id),sp=aix(a);if(!a)return;
 if(!AIKEY()){S.msg="The AI isn’t switched on yet. Ask your admin to add the API key.";return R()}
 sp.f.forEach(f=>{const el=document.getElementById("aif_"+f.k);if(el&&el.value&&!HaiVal(id,f.k,""))HaiSet(id,f.k,el.value)});
 const val=k=>HaiVal(id,k,""),main=val(sp.f[0].k).trim(),fu=follow?v("aifu"):"";
 if(follow&&!fu)return;if(!follow&&!main){S.msg="Please fill in “"+sp.f[0].l+"” first.";return R()}
 const ctx=sp.f.map(f=>{const x=val(f.k)||(f.t=="s"?f.d:"");return x?f.l+": "+x:""}).filter(Boolean).join("\n");
 const lang=HaiVal(id,"lang","")?`Write everything in ${HaiVal(id,"lang","")}.`:"Reply in the language the student writes in (default English).";
 let C=S.hc&&S.hc.id==id?S.hc:null;if(!follow||!C)C=S.hc={id,m:[],r:[],u:[]};
 C.m.push({role:"user",content:follow?fu:ctx});C.u.push(follow?fu:"");S.hbusy=id;R();
 try{const o=await aiChat([{role:"system",content:`You are SG Astra Study Hub's “${a[2]}” tool — an expert, patient and encouraging teacher for Indian school and college students. Today is ${today2()}. ${sp.sys} ${lang} ${SCHEMA}`},...C.m.slice(-8)]);
  C.m.push({role:"assistant",content:o});C.r.push(aiParseOut(o));aiSaveHist(id,follow?fu:main,C.r[C.r.length-1]);hxp&&hxp(2)}
 catch(x){C.m.pop();C.u.pop();S.msg="⚠ The AI couldn’t answer. Check your internet and try again."}
 S.hbusy=0;R()}
const aiLast=()=>S.hc&&S.hc.r.length?aiFlat(S.hc.r[S.hc.r.length-1]):"";
function HaiRefine(id,i){const el=document.getElementById('aifu');if(el)el.value=REFINE[i][1];else return;HaiRun(id,1)}
function HaiReport(){const C=S.hc;if(!C||!C.r.length)return;reportAI(C.id,aiFlat(C.r[C.r.length-1]),"tool")}
function HaiCopy(){try{navigator.clipboard.writeText(aiLast());S.msg="Copied ✅"}catch(x){S.msg="Couldn’t copy on this device."}R()}
function HaiSpeak(){const t=aiLast().replace(/[•*#]/g,"");if(!t){S.msg="Nothing to read yet.";return R()}const id=S.hc&&S.hc.id,lg=HaiVal(id,"lang","")||HaiVal(id,"to","");speak(t.slice(0,3500),VC[lg]||null,.95)}
function HaiNote(){const C=S.hc;if(!C||!C.r.length)return;hl("notes").push({t:C.id+" · "+today(),tag:"AI",x:aiFlat(C.r[C.r.length-1]),d:today()});hsv();S.msg="Saved to Notes ✅";R()}

Object.assign(window,{HaiV,HaiRun,HaiSet,HaiCopy,HaiSpeak,HaiNote,aiRich,HaiEx,HaiHist,HaiShare,HaiRefine,HaiReport});
})();
