// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const LIFESTYLE_ARTICLES: LearnArticle[] = [
  {
    slug: "iron-rich-eating",
    category: "lifestyle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Iron", href: "https://www.nhs.uk/conditions/vitamins-and-minerals/iron/" },
      { label: "NIH Office of Dietary Supplements — Iron", href: "https://ods.od.nih.gov/factsheets/Iron-Consumer/" },
    ],
    related: ["anemia", "heavy-periods", "healthy-eating"],
    en: {
      title: "Iron and your period",
      summary: "People with periods need more iron, and heavy bleeding raises the risk of running low. Here is how much you need, where to find it, and when to get checked.",
      sections: [
        {
          heading: "Why iron matters",
          body: "Your body uses iron to make haemoglobin. This is the protein in red blood cells that carries oxygen from your lungs to the rest of your body. Iron also helps bring oxygen to your muscles. When you bleed, you lose red blood cells and the iron inside them. This is one reason heavy periods raise the risk of low iron.",
        },
        {
          heading: "How much you need",
          body: "Most people can get all the iron they need from a varied diet. Needs differ by country, age and sex. As one example, the NHS advises 14.8 mg a day for women aged 19 to 49, and 8.7 mg a day for men and for women aged 50 and over. Teenage girls, people with heavy periods and pregnant women are among the groups most likely to run low.",
        },
        {
          heading: "Foods rich in iron",
          body: "Good sources include red meat, poultry, fish and seafood. Plant sources include beans and lentils, such as kidney beans, chickpeas and edamame, as well as peas, spinach, nuts and dried fruit such as apricots and raisins. Many breakfast cereals and breads have iron added (they are fortified). If you do not eat meat, eating plenty of these plant foods can help you get enough.",
        },
        {
          heading: "Helping your body absorb iron",
          body: "Your body absorbs iron from plant foods better when you eat them with foods rich in vitamin C. Citrus fruits, strawberries, peppers, tomatoes and broccoli are all good choices. Eating some meat, poultry or seafood in the same meal helps too. For example, you could have beans in tomato sauce, lentils with peppers, or a fortified cereal with strawberries.",
        },
        {
          heading: "Signs of low iron",
          body: "Losing a lot of blood each period can lead to iron deficiency anaemia. This means your body does not have enough iron to make the red blood cells it needs. Signs include tiredness, weakness and lack of energy, an upset stomach, and trouble concentrating or remembering things. Logging your bleeding in Ciclo can help you describe how heavy your periods are to a doctor.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your periods are heavy. For example, you change a pad or tampon every 1 to 2 hours, or you bleed for more than 7 days. Also see them if you often feel tired or weak. Ask whether your iron levels should be checked. Some people need iron tablets, but talk to a doctor or pharmacist first, as too much iron can cause side effects. Keep iron tablets out of sight and reach of children. Get urgent help if you have very heavy bleeding with dizziness or fainting.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods are heavy or you feel tired all the time, talk to a doctor or nurse.",
    },
  },
  {
    slug: "healthy-eating",
    category: "lifestyle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — 8 tips for healthy eating", href: "https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/" },
      { label: "WHO — Healthy diet", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
    ],
    related: ["iron-rich-eating", "calcium-vitamin-d", "cravings-appetite"],
    en: {
      title: "Eating well",
      summary: "Eating well is about variety and balance over time, not strict rules or diets. Here are the basics most health bodies agree on.",
      sections: [
        {
          heading: "Balance, not rules",
          body: "There is no single right way to eat. A healthy diet looks different depending on your age, how active you are, your culture and the foods you can get. Eating a wide range of foods helps your body get all the nutrients it needs. Over time, a balanced diet helps protect against poor nutrition and long-term illnesses such as heart disease.",
        },
        {
          heading: "Fruit, vegetables and wholegrains",
          body: "Fruit and vegetables are a good base for most meals. The NHS suggests eating at least 5 portions of a mix of fruit and vegetables every day. For starchy foods such as bread, rice, pasta and potatoes, choose wholegrain or higher-fibre kinds when you can. Wholewheat pasta, brown rice and potatoes with their skins on are easy swaps.",
        },
        {
          heading: "Fish, fats and salt",
          body: "The NHS suggests having fish at least twice a week, including one portion of oily fish such as salmon, trout or mackerel. Eating a lot of saturated fat can raise your blood cholesterol, and high cholesterol makes heart disease more likely. Steaming or boiling instead of frying is one easy way to use less fat. Using less salt and fewer salty sauces when you cook helps too.",
        },
        {
          heading: "Drinks, sugar and breakfast",
          body: "Drink enough fluids so you do not get dehydrated. The NHS suggests 6 to 8 glasses a day. Having sugary foods and drinks often raises the risk of tooth decay, so it helps to have them less often. If you eat breakfast, a choice that is high in fibre and low in fat, sugar and salt can be part of a balanced diet.",
        },
        {
          heading: "Eating around your period",
          body: "Many people notice changes in appetite or food cravings in the days before a period. This is a common part of PMS and nothing to feel guilty about. A healthy, balanced diet is one of the self-help steps the NHS suggests for PMS. If your periods are heavy, foods rich in iron are worth including, as heavy bleeding raises the risk of low iron.",
        },
        {
          heading: "When to get advice",
          body: "Eating well works best alongside regular activity, which can lower the risk of serious health conditions. Talk to a doctor, nurse or dietitian if you have a health condition, are pregnant, or need help with a special diet. Also talk to someone if worries about food or your body take up a lot of your time, as this can be a sign that you need more support.",
        },
      ],
      notice: "This is general information. For advice that fits your health needs, talk to a doctor, nurse or dietitian.",
    },
  },
  {
    slug: "calcium-vitamin-d",
    category: "lifestyle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NIH Office of Dietary Supplements — Calcium", href: "https://ods.od.nih.gov/factsheets/Calcium-Consumer/" },
      { label: "NIH Office of Dietary Supplements — Vitamin D", href: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/" },
      { label: "NHS — Osteoporosis: causes", href: "https://www.nhs.uk/conditions/osteoporosis/causes/" },
      { label: "KidsHealth — Female athlete triad", href: "https://kidshealth.org/en/teens/triad.html" },
    ],
    related: ["bone-health", "red-s", "healthy-eating"],
    en: {
      title: "Calcium and vitamin D",
      summary: "Calcium and vitamin D work together to keep your bones strong. Here is why they matter at every age, where to find them, and who may need more.",
      sections: [
        {
          heading: "Why your bones need them",
          body: "Almost all the calcium in your body is stored in your bones and teeth, where it makes them hard and strong. Your muscles and nerves need calcium too. Vitamin D helps your body absorb calcium from food, so the two work as a team. Vitamin D also helps your muscles, nerves and immune system work well. Without enough of them over time, bones can become weak and fragile (osteoporosis), which raises the risk of breaks.",
        },
        {
          heading: "Bones, hormones and your cycle",
          body: "Hormones matter for bones as well as food. Oestrogen helps keep bones strong. Low oestrogen, poor nutrition and too little calcium or vitamin D can all lead to bone loss. This is one reason periods that stop because of under-eating or very heavy training are worth getting checked. After menopause, oestrogen levels fall and bones can lose strength quickly. The body also absorbs and holds on to less calcium. This makes calcium and vitamin D even more important in later life.",
        },
        {
          heading: "Where to find calcium",
          body: "Milk, yoghurt and cheese are rich in calcium. Other sources include tinned sardines and salmon eaten with their soft bones, and green vegetables such as kale, broccoli and pak choi. Many plant-based drinks, such as soy and almond drinks, and some fruit juices have calcium added. If you avoid dairy, for example because you are vegan or lactose intolerant, it can be harder to get enough, so look for fortified foods.",
        },
        {
          heading: "Getting enough vitamin D",
          body: "Sunlight on your skin helps your body make vitamin D. Glass blocks this, so sitting by a window does not help. You make less on cloudy or smoggy days, as you get older, and if you have darker skin. The best natural food sources are fish such as salmon, trout, mackerel and tuna. Egg yolks, cheese and mushrooms have small amounts. In some countries, milk and other foods have vitamin D added.",
        },
        {
          heading: "How much you need",
          body: "Advice differs between countries and changes with age, so check your local guidance. As one example, the US National Institutes of Health advises 1,000 mg of calcium a day for adults aged 19 to 50, rising to 1,200 mg for women aged 51 to 70. Children and teens aged 9 to 18 need more, 1,300 mg a day. The same body advises 15 micrograms (600 IU) of vitamin D a day for most people aged 1 to 70.",
        },
        {
          heading: "Supplements and advice",
          body: "Too much calcium or vitamin D from supplements can cause problems, such as feeling sick, constipation and kidney stones. Some people may need a supplement, for example if you avoid dairy, have darker skin, are pregnant or breastfeeding, or are past menopause. Ask a doctor, nurse or pharmacist before you start one. Breast milk alone does not give babies enough vitamin D, so ask about this if you are breastfeeding.",
        },
      ],
      notice: "This is general information. Advice on calcium and vitamin D differs by country, so check with a doctor, nurse or pharmacist.",
    },
  },
  {
    slug: "exercise-and-periods",
    category: "lifestyle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Physical activity guidelines for adults aged 19 to 64", href: "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/" },
      { label: "NHS — Period pain", href: "https://www.nhs.uk/conditions/period-pain/" },
      { label: "WHO — Physical activity", href: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      { label: "Office on Women's Health — Physical activity and your menstrual cycle", href: "https://www.womenshealth.gov/getting-active/physical-activity-menstrual-cycle" },
    ],
    related: ["red-s", "period-pain", "pms"],
    en: {
      title: "Staying active through your cycle",
      summary: "You can keep moving during your period, and gentle exercise may even ease cramps. Here is how much activity helps, and when hard training can stop periods.",
      sections: [
        {
          heading: "Exercise on your period",
          body: "There is no need to stop being active when you have your period. Gentle exercise such as walking, swimming, cycling or yoga may help ease period pain, even if you do not feel like moving. People who exercise regularly often have fewer painful cramps, and being active may help PMS even when your energy is low. Wear whichever period product feels most comfortable for your activity. If you feel tired or crampy, a lighter session is fine.",
        },
        {
          heading: "How activity helps",
          body: "Regular activity lowers the risk of heart disease and stroke. It can also reduce symptoms of depression and anxiety and improve your sense of well-being. For children and teens, it helps build fitness and healthy bones. Any amount of activity is better than none, and all of it counts.",
        },
        {
          heading: "How much to aim for",
          body: "The NHS advises adults aged 19 to 64 to do at least 150 minutes of moderate activity a week, such as brisk walking, dancing or cycling. Or you can do 75 minutes of vigorous activity, such as running or fast swimming. It is best to spread this over 4 to 5 days, or every day. Muscle-strengthening activity, such as yoga, pilates, lifting weights or carrying heavy shopping, is advised on at least 2 days a week. Breaking up long spells of sitting helps too.",
        },
        {
          heading: "Listening to your body",
          body: "You do not need a special workout plan for each phase of your cycle. The same activity advice applies all month. Some days, cramps, tiredness or heavy bleeding may make a hard session feel wrong, and it is fine to choose something gentler. Logging your activity and symptoms in Ciclo can show you how you tend to feel across your cycle.",
        },
        {
          heading: "When training stops your periods",
          body: "Exercising a lot can make periods irregular or stop them, especially if you do not eat enough to cover the energy you use. When the cause is too little energy for the training you do, it is called relative energy deficiency in sport (RED-S). Lost periods are a warning sign. Low oestrogen, poor nutrition and too little calcium or vitamin D can cause bone loss and make stress fractures more likely.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your periods stop, come less often or become irregular while you are training. Also go if you keep getting injuries such as stress fractures. Also get checked if period pain or heavy bleeding regularly stops you being active. Get urgent help if you have very heavy bleeding with dizziness or fainting.",
        },
      ],
      notice: "This is general information. If your periods stop or change while you are training, talk to a doctor or nurse.",
    },
  },
  {
    slug: "red-s",
    category: "lifestyle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NICHD — What causes amenorrhea?", href: "https://www.nichd.nih.gov/health/topics/amenorrhea/conditioninfo/causes" },
      { label: "British Journal of Sports Medicine — 2023 IOC consensus statement on REDs", href: "https://pubmed.ncbi.nlm.nih.gov/37752011/" },
      { label: "KidsHealth — Female athlete triad", href: "https://kidshealth.org/en/teens/triad.html" },
      { label: "NHS — Osteoporosis: causes", href: "https://www.nhs.uk/conditions/osteoporosis/causes/" },
      { label: "Office on Women's Health — Physical activity and your menstrual cycle", href: "https://www.womenshealth.gov/getting-active/physical-activity-menstrual-cycle" },
    ],
    related: ["exercise-and-periods", "eating-disorders", "missed-periods"],
    en: {
      title: "Under-fuelling and lost periods (RED-S)",
      summary: "If you do not eat enough to cover the energy you use, your periods can become irregular or stop. Lost periods are a warning sign worth getting checked.",
      sections: [
        {
          heading: "What RED-S is",
          body: "Relative energy deficiency in sport (RED-S, also written REDs) happens when, over time, you do not eat enough to cover the energy your body uses, including for exercise. It affects men as well as women. A related, older term, the female athlete triad, describes three linked problems: not eating enough for your activity, missed periods and weak bones. RED-S is a broader idea that covers many effects on health and sports performance.",
        },
        {
          heading: "How it can happen",
          body: "RED-S can happen without anyone meaning it to. You might start training more without eating more, or train more while also eating less. It is more likely in sports where being thin is seen as an advantage, such as distance running, gymnastics, figure skating, dance and rowing. Training a lot in one sport from a young age, or feeling pressure to lose weight, can add to the risk. Sometimes it is linked to an eating disorder, and sometimes it is not.",
        },
        {
          heading: "Effects on periods and bones",
          body: "When energy is low, a part of the brain called the hypothalamus can slow or stop a hormone that the cycle depends on. Oestrogen levels drop. Cycles may get longer or less regular, and periods may stop altogether. Low oestrogen, poor nutrition and too little calcium or vitamin D can cause bone loss. This makes stress fractures (tiny cracks in a bone) more likely. Over time, bones can become weak enough to break easily (osteoporosis).",
        },
        {
          heading: "Other effects",
          body: "RED-S can affect your health and your sports performance in many ways, not only your periods. Broken bones and other sports injuries can become more common. Mood can be affected too, and low mood, anxiety or depression can come with RED-S. These signs are worth taking seriously, even if your periods have not stopped.",
        },
        {
          heading: "Treatment and recovery",
          body: "Treatment means closing the gap between the energy you take in and the energy you use. That usually means eating more, training less, or both. Getting enough calcium and vitamin D also helps protect your bones. Care often comes from a team, which may include a doctor, a dietitian, a mental health professional and a coach or trainer. If disordered eating is part of the picture, treatment will include support for that too. Recovery takes time, so it helps to start early.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Losing your periods is a warning sign, not a normal part of training. See a doctor or nurse if your periods stop or become irregular while you are training or eating less. Also go if you are 15 or older and your periods have not started, or if you have a stress fracture or keep getting injured. Logging your periods and activity in Ciclo can help you spot changes early and show a doctor what has happened.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods have stopped, talk to a doctor or nurse.",
    },
  },
  {
    slug: "sleep",
    category: "lifestyle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "CDC — About sleep", href: "https://www.cdc.gov/sleep/about/index.html" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
      { label: "NHS — Generalised anxiety disorder (GAD)", href: "https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder/overview/" },
      { label: "NHS — Postnatal depression", href: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/" },
    ],
    related: ["fatigue-sleep", "pms", "stress-and-cycle"],
    en: {
      title: "Sleep well",
      summary: "Most adults need 7 or more hours of sleep a night. Here is why sleep matters, habits that help, and how your cycle and mood can affect your sleep.",
      sections: [
        {
          heading: "How much sleep you need",
          body: "Sleep needs change with age. The US Centers for Disease Control and Prevention (CDC) advises at least 7 hours a night for adults aged 18 to 60. It advises 7 to 9 hours from 61 to 64, and 7 to 8 hours from 65. Teens aged 13 to 17 need more, about 8 to 10 hours a night. Regularly getting less than you need can affect both your body and your mood.",
        },
        {
          heading: "Why sleep matters",
          body: "Enough sleep helps you get ill less often, manage stress and improve your mood. Over time, it also lowers the risk of long-term conditions such as type 2 diabetes, heart disease, high blood pressure and stroke. Being well rested also makes road accidents less likely.",
        },
        {
          heading: "Habits that help",
          body: "Keep regular times for going to bed and waking up, even at weekends. A quiet, cool and calm bedroom helps. Turn off screens and devices at least 30 minutes before bed. Avoid large meals and alcohol close to bedtime, and avoid caffeine in the afternoon and evening. Being active during the day and eating a healthy diet can help you sleep better too.",
        },
        {
          heading: "Sleep, your cycle and your mood",
          body: "Tiredness and trouble sleeping are common symptoms of PMS before a period. Poor sleep can also come with anxiety and depression. After having a baby, being unable to sleep even when you get the chance to rest can be a sign of postnatal depression. Adding a note or tag in Ciclo on nights you sleep badly can show whether it follows your cycle.",
        },
        {
          heading: "When to talk to a doctor or nurse",
          body: "Talk to a doctor or nurse if you regularly have problems sleeping or notice signs of a sleep disorder. Also get help if poor sleep comes with low mood, loss of interest in things, or worry that is hard to control, as these can be signs of depression or anxiety.",
        },
      ],
      notice: "This is general information. If you often struggle to sleep, talk to a doctor or nurse.",
    },
  },
  {
    slug: "alcohol-smoking",
    category: "lifestyle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "CDC — Health effects of cigarettes: reproductive health", href: "https://www.cdc.gov/tobacco/about/cigarettes-and-reproductive-health.html" },
      { label: "NHS — Drinking alcohol while pregnant", href: "https://www.nhs.uk/pregnancy/keeping-well/drinking-alcohol-while-pregnant/" },
      { label: "NHS — Period pain", href: "https://www.nhs.uk/conditions/period-pain/" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
      { label: "WHO — Alcohol", href: "https://www.who.int/news-room/fact-sheets/detail/alcohol" },
    ],
    related: ["preconception-health", "trying-to-conceive", "healthy-pregnancy"],
    en: {
      title: "Alcohol, smoking and reproductive health",
      summary: "Smoking and alcohol can affect period pain, your chances of getting pregnant and a baby's health. It is never too late to stop or cut down.",
      sections: [
        {
          heading: "Periods, PMS and long-term health",
          body: "Cutting down on alcohol and not smoking may help ease period pain. Not smoking and not drinking too much alcohol are also among the self-help steps suggested for premenstrual syndrome (PMS). PMS can bring mood swings, tiredness and trouble sleeping in the weeks before a period. Cutting down may help you feel better then too. Alcohol affects your health outside pregnancy as well. The WHO says no amount of drinking is completely free of risk. Alcohol raises the risk of several cancers, including breast cancer.",
        },
        {
          heading: "Smoking and fertility",
          body: "Smoking can make it harder to get pregnant and raises the chance of never becoming pregnant. In men, smoking damages sperm and can lead to problems getting or keeping an erection (erectile dysfunction). So if you are trying for a baby, it helps if both partners stop. Stopping smoking may also lower the risk of an early menopause (before age 45).",
        },
        {
          heading: "Smoking in pregnancy",
          body: "Smoking in pregnancy raises the risk of problems with the placenta, the waters breaking too early, and an ectopic pregnancy (a pregnancy that grows outside the womb). Babies are more likely to be born early, before 37 weeks, or to be born small. Smoking also raises the risk of cleft lip or palate and of sudden infant death syndrome (SIDS). Breathing in other people's smoke in pregnancy can lower a baby's birth weight. Stopping at any point in pregnancy helps.",
        },
        {
          heading: "Alcohol and pregnancy",
          body: "If you are pregnant or trying for a baby, the safest choice is not to drink alcohol at all. If you are breastfeeding, ask a doctor, nurse or midwife about alcohol. Alcohol passes through the placenta to the baby, whose liver cannot yet process it. Drinking in pregnancy raises the risk of miscarriage, premature birth and low birth weight. It can also cause fetal alcohol spectrum disorder (FASD), a lifelong condition. The more you drink, the greater the risk.",
        },
        {
          heading: "If you drank before you knew",
          body: "If you drank alcohol before you knew you were pregnant, avoid alcohol for the rest of the pregnancy. Try not to worry too much, as the risk to the baby is likely to be low. If you want to stop smoking or cut down on drinking, a doctor, nurse, midwife or pharmacist can help you find support. You do not have to do it alone.",
        },
      ],
      notice: "This is general information. For help to stop smoking or drinking, talk to a doctor, nurse or pharmacist.",
    },
  },
];
