// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const MIND_ARTICLES: LearnArticle[] = [
  {
    slug: "mood-and-cycle",
    category: "mind",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
      { label: "Mind — About PMDD", href: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/premenstrual-dysphoric-disorder-pmdd/about-pmdd/" },
      { label: "NIMH — Depression in women: 4 types of depression unique to women", href: "https://www.nimh.nih.gov/health/publications/depression-in-women" },
      { label: "NHS — Postnatal depression", href: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/" },
    ],
    related: ["pms", "pmdd", "depression"],
    en: {
      title: "Mood changes across the cycle",
      summary: "Many people notice their mood shift before a period. Here is how hormones may play a part, what helps, and when low mood is more than PMS.",
      sections: [
        {
          heading: "How your cycle can affect mood",
          body: "Your hormone levels rise and fall across each menstrual cycle. Many people notice changes in their mood in the weeks before a period. This is part of premenstrual syndrome (PMS). The exact cause is not known, but it may be linked to these changing hormone levels. How strongly it affects people varies a lot. Some people notice only small changes. For others, the changes are much harder to live with.",
        },
        {
          heading: "Feelings that are common before a period",
          body: "Common emotional changes include mood swings, feeling irritable or low, and feeling upset, anxious or emotional. Physical symptoms often come at the same time. These include tiredness or trouble sleeping, bloating, sore breasts, headaches and changes in appetite or food cravings. These feelings are common and are not a sign of weakness. The PMS article explains the symptoms in more detail.",
        },
        {
          heading: "When it is more than PMS",
          body: "For a small number of people, premenstrual symptoms are much more severe. This is called premenstrual dysphoric disorder (PMDD). Symptoms come in the time between ovulation and your next period. For most people, this time lasts about 2 weeks. PMDD can cause depression, anxiety, anger and suicidal thoughts. Research suggests that people with PMDD may be more sensitive to the normal hormone changes of the cycle. The PMDD article explains how it is diagnosed and treated.",
        },
        {
          heading: "Other times hormones can affect mood",
          body: "Mood can also change at other times of big hormone shifts. Feeling down, anxious or irritable for a few days after giving birth is very common and usually passes within 2 weeks. If low mood is severe or lasts longer, it may be postnatal depression. Some women also have stronger feelings of irritability, anxiety, sadness or loss of enjoyment in the years leading up to menopause (perimenopause). Both kinds of depression can be treated.",
        },
        {
          heading: "What can help",
          body: "Regular exercise, a healthy, balanced diet and plenty of sleep may help ease PMS symptoms. Yoga, meditation or other ways to lower stress may help too, as can not smoking and not drinking too much alcohol. Keeping a record of your mood for at least 2 cycles can show whether changes follow a pattern, and logging mood in Ciclo alongside your period makes this easier. If self-help is not enough, a doctor can talk to you about hormonal contraception, talking therapy (CBT) or antidepressants.",
        },
        {
          heading: "When to get help",
          body: "See a doctor or nurse if mood changes are affecting your daily life, or if self-help has not worked. Also get help if you feel low most of the day, nearly every day, for 2 weeks or more, at any point in your cycle. If you are thinking about harming yourself or ending your life, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If mood changes are hard to live with, talk to a doctor or nurse.",
    },
  },
  {
    slug: "depression",
    category: "mind",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "WHO — Depressive disorder (depression)", href: "https://www.who.int/news-room/fact-sheets/detail/depression" },
      { label: "NIMH — Depression", href: "https://www.nimh.nih.gov/health/topics/depression" },
      { label: "NIMH — Depression in women: 4 types of depression unique to women", href: "https://www.nimh.nih.gov/health/publications/depression-in-women" },
    ],
    related: ["mood-and-cycle", "anxiety", "postpartum-depression"],
    en: {
      title: "Depression",
      summary: "Depression is more than a few sad days. It is common, it affects how you feel, think and cope, and it can be treated. Here are the signs and where to start.",
      sections: [
        {
          heading: "What depression is",
          body: "Everyone feels sad or low at times. Depression is different. It is an illness that changes your mood and your thinking, and makes everyday things like sleep, meals and work harder to manage. It is common: the WHO estimates that about 1 in 20 adults worldwide have depression, and it is about 1.5 times more common in women than in men. Genes, body chemistry, stressful or difficult life events and your surroundings can all play a part.",
        },
        {
          heading: "Signs to look out for",
          body: "The main signs are a low, sad, irritable or empty mood, or losing interest or pleasure in things you used to enjoy. Other signs include feeling very tired, finding it hard to concentrate, sleeping or eating more or less than usual, feeling guilty or worthless, and feeling hopeless about the future. Some people have aches and pains with no clear physical cause. With depression, these feelings last most of the day, nearly every day, for at least 2 weeks.",
        },
        {
          heading: "Depression and your hormones",
          body: "Some types of depression are linked to times of hormone change. Premenstrual dysphoric disorder (PMDD) causes severe low mood, irritability and other symptoms in the weeks before a period. Perinatal depression can start during pregnancy or after giving birth. Some women also have depression during the change to menopause (perimenopause). If your low mood seems to follow your cycle, logging it in Ciclo can help you show a doctor the pattern.",
        },
        {
          heading: "Treatment that works",
          body: "Depression can be treated, even when it is severe. Common treatments are talking therapy, antidepressant medicines, or both together. Talking therapies with good evidence include cognitive behavioural therapy (CBT), behavioural activation, interpersonal therapy and problem-solving therapy. Therapy can be face to face or online. A doctor or nurse can talk through the options with you and help you choose what suits you.",
        },
        {
          heading: "Things you can do for yourself",
          body: "Small steps can support your recovery. Try to keep doing things you used to enjoy, even for a short time. Stay in touch with friends and family. Try to be active often. A short walk is a good start. Keep to regular times for eating and sleeping where you can. Avoid or cut down on alcohol, and avoid illegal drugs.",
        },
        {
          heading: "When to get help",
          body: "See a doctor or nurse if you have had signs of depression most of the day, nearly every day, for 2 weeks or more. Go sooner if you are struggling to cope. Depression can affect anyone, and asking for help is a normal first step. If you are thinking about harming yourself or ending your life, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you think you may have depression, talk to a doctor or nurse.",
    },
  },
  {
    slug: "anxiety",
    category: "mind",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Generalised anxiety disorder (GAD)", href: "https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder/overview/" },
      { label: "NIMH — Anxiety disorders", href: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
      { label: "NIMH — Depression in women: 4 types of depression unique to women", href: "https://www.nimh.nih.gov/health/publications/depression-in-women" },
      { label: "NHS — Panic disorder", href: "https://www.nhs.uk/mental-health/conditions/panic-disorder/" },
    ],
    related: ["mood-and-cycle", "depression", "pmdd"],
    en: {
      title: "Anxiety",
      summary: "Feeling anxious now and then is normal. When worry is hard to control and gets in the way of daily life, support and treatment can help.",
      sections: [
        {
          heading: "Everyday worry and anxiety disorders",
          body: "Most people feel anxious sometimes, for example before a test or a hard conversation. That does not mean you have an anxiety disorder. With an anxiety disorder, the worry stays. It comes up in many parts of your life and may get stronger over time. Types include generalised anxiety disorder (GAD), panic disorder, social anxiety disorder and phobias. GAD is a common condition, and it affects more women than men. It is more likely if close relatives have anxiety or depression, after stressful or traumatic events, or if you live with a painful long-term condition.",
        },
        {
          heading: "How anxiety can feel",
          body: "The main sign of GAD is stress or worry that is hard to control and affects your daily life. You may feel restless, tense or irritable, find it hard to concentrate, or get tired easily. Anxiety affects the body too. It can cause trouble sleeping, stomach problems, a pounding or unusual heartbeat (palpitations), and feeling lightheaded or dizzy. Low mood or depression can come with it. A panic attack is a sudden rush of strong fear, often for no clear reason. Your heart may race, and you may sweat, shake, feel sick, dizzy or short of breath, or have chest pain. Most attacks last 5 to 20 minutes. They are frightening, but they do not harm your body.",
        },
        {
          heading: "Anxiety and your cycle",
          body: "Hormone changes can affect anxiety for some people. Feeling anxious, upset or emotional is a common part of premenstrual syndrome (PMS) in the weeks before a period. Severe anxiety, irritability or low mood before periods can be a sign of premenstrual dysphoric disorder (PMDD). Anxiety can also come with depression during pregnancy, after birth or around menopause. Noting your mood in Ciclo can show whether your anxiety follows your cycle.",
        },
        {
          heading: "What can help",
          body: "Talking to someone you trust about how you feel can help. So can learning calming breathing exercises, being active regularly, eating a healthy diet and getting enough sleep. Try to cut down on coffee, tea, cola and energy drinks. Try not to use alcohol, cigarettes, gambling or illegal drugs to manage anxiety. If anxiety is affecting your life, a doctor can offer treatment. The main options are talking therapy, usually cognitive behavioural therapy (CBT), and medicine, most often a type of antidepressant called an SSRI.",
        },
        {
          heading: "When to get help",
          body: "See a doctor or nurse if you think you might have an anxiety disorder, or if worry is hard to control and is affecting your daily life. Chest pain or trouble breathing can also have other causes. If you are not sure it is a panic attack, get emergency help. If you are thinking about harming yourself or ending your life, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If worry is affecting your daily life, talk to a doctor or nurse.",
    },
  },
  {
    slug: "postpartum-depression",
    category: "mind",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Postnatal depression", href: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/" },
      { label: "NIMH — Perinatal depression", href: "https://www.nimh.nih.gov/health/publications/perinatal-depression" },
      { label: "WHO — Depressive disorder (depression)", href: "https://www.who.int/news-room/fact-sheets/detail/depression" },
      { label: "NHS — Postpartum psychosis", href: "https://www.nhs.uk/mental-health/conditions/post-partum-psychosis/" },
    ],
    related: ["periods-after-birth", "depression", "mood-and-cycle"],
    en: {
      title: "Postnatal depression",
      summary: "Feeling low for a few days after birth is very common. If low mood is severe or lasts longer than 2 weeks, it may be postnatal depression, which can be treated.",
      sections: [
        {
          heading: "Baby blues or depression",
          body: "Many people feel down, anxious or irritable for a few days after giving birth. This is often called the baby blues. It is very common and usually passes within 2 weeks. Postnatal depression (also called postpartum depression) is different. It is a common mental health condition, and the feelings are more severe or last longer. It can begin during pregnancy, soon after birth, or at any time up to a year after.",
        },
        {
          heading: "Signs to look out for",
          body: "Signs include low mood, finding it hard to enjoy anything, and feeling hopeless or unable to cope. You may feel guilty or worthless, or feel that you are a bad parent. Some people worry all the time, feel restless or irritable, cannot sleep even when they get the chance to rest, or find it hard to concentrate. You may have difficult feelings about your baby or find it hard to bond. Having these feelings is not your fault.",
        },
        {
          heading: "Why it happens",
          body: "Several things may play a part. These include the hormone changes of pregnancy and birth, lack of sleep, and the physical and emotional demands of caring for a new baby. Other stress, such as pressure at work or past trauma, can add to it. You are more likely to have it if you or a close relative have had depression or bipolar disorder before. Partners, including fathers, can also have depression after a baby arrives.",
        },
        {
          heading: "Treatment and support",
          body: "Postnatal depression can be treated. Options include talking therapies such as cognitive behavioural therapy (CBT), antidepressant medicines, or both. Many antidepressants are safe to use while breastfeeding. If you are breastfeeding, ask a doctor which ones suit you. Staying connected with friends and family can also help. You do not have to wait until you feel very unwell to ask for support.",
        },
        {
          heading: "When to get help",
          body: "Talk to a doctor, nurse or midwife if you think you might have postnatal depression, or if low mood lasts more than 2 weeks after the birth. If you are thinking about harming yourself or your baby, or about ending your life, get emergency help or contact a crisis line now.",
        },
        {
          heading: "A rare emergency: postpartum psychosis",
          body: "Postpartum psychosis is a rare but serious illness. It affects about 1 in 1,000 mothers and usually starts suddenly in the first 2 weeks after birth, often within hours or days. Signs include seeing or hearing things that are not there, believing things that are not true, feeling unusually high or suspicious, fast-changing moods and confusion. It is a medical emergency. If you notice these signs in yourself or someone else, get emergency help straight away. With treatment, most people recover fully. If you have bipolar disorder or have had psychosis before, tell your doctor or midwife during pregnancy.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you are struggling after having a baby, talk to a doctor, nurse or midwife.",
    },
  },
  {
    slug: "stress-and-cycle",
    category: "mind",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Missed or late periods", href: "https://www.nhs.uk/conditions/stopped-or-missed-periods/" },
      { label: "NICHD — What causes amenorrhea?", href: "https://www.nichd.nih.gov/health/topics/amenorrhea/conditioninfo/causes" },
      { label: "NHS — 10 stress busters", href: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress/" },
    ],
    related: ["missed-periods", "irregular-periods", "anxiety"],
    en: {
      title: "Stress and your cycle",
      summary: "Stress can delay or even stop your period for a while. Here is how stress affects your cycle, ways to cope, and when a missed period needs checking.",
      sections: [
        {
          heading: "How stress affects your period",
          body: "Your cycle is controlled by hormones, and the signals start in your brain. A small area of the brain called the hypothalamus helps run many body processes, including your cycle. Severe physical or emotional stress can upset how it works. It may then slow or stop releasing a hormone that the cycle depends on. As a result, a period can come late, or periods can stop for a while.",
        },
        {
          heading: "Other reasons a period can be late",
          body: "Stress is only one possible reason for a late or missed period. Others include pregnancy, breastfeeding, sudden weight loss, doing a lot of exercise, some types of hormonal contraception, perimenopause, PCOS and thyroid problems. Very heavy training, eating too little and stress can also add up and stop periods together. If your period is late and you could be pregnant, take a pregnancy test first.",
        },
        {
          heading: "Ways to manage stress",
          body: "You cannot always change a stressful situation, but there are ways to cope with it better. Being active can help calm strong feelings. Spend time with people who support you, and make time for rest, hobbies or relaxing. Focus on what you can control and try to accept what you cannot. Try not to rely on alcohol, smoking or caffeine to cope. Helping others, for example by volunteering, may also help you cope better with hard times.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if you have missed 3 periods in a row and are not pregnant or breastfeeding, or if your periods have become irregular. Also get checked if a missed period comes with other changes, such as weight gain or loss, tiredness, new hair growth on your face, or dry or oily skin. Logging your periods and mood in Ciclo can show whether stressful weeks line up with late periods. If stress feels hard to manage or affects your mood most days, a doctor or nurse can help with that too. If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods stop or change, talk to a doctor or nurse.",
    },
  },
  {
    slug: "body-image",
    category: "mind",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Body image", href: "https://womenshealth.gov/mental-health/body-image-and-mental-health/body-image" },
      { label: "NHS — Eating disorders", href: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/eating-disorders/overview/" },
      { label: "NHS — PMS (premenstrual syndrome)", href: "https://www.nhs.uk/conditions/pre-menstrual-syndrome/" },
    ],
    related: ["eating-disorders", "depression", "healthy-eating"],
    en: {
      title: "Body image",
      summary: "Body image is how you think and feel about your body. A kinder view of yourself is good for your mental health, and it can grow with practice.",
      sections: [
        {
          heading: "What body image means",
          body: "Body image is how you see your body and how you feel about it, in the mirror or in your own mind. A healthy body image means feeling at ease in your body and mostly happy with how you look. Your body also changes naturally over time, and even across a cycle. Bloating before a period, for example, is common.",
        },
        {
          heading: "What shapes how you see yourself",
          body: "Many things affect body image. Media and advertising tend to show women who are thin and young, and the images are often edited. The people around you matter too. Children pick up ideas from adults: daughters whose mothers diet are twice as likely to think about dieting themselves. Being teased or bullied about your looks as a child can also shape how you see yourself later.",
        },
        {
          heading: "Why it matters for your health",
          body: "A negative body image can lower your self-esteem, which can affect many parts of your life. It can also raise the risk of some mental health problems, such as depression and eating disorders. Some people become very distressed about small or imagined flaws in how they look. This can be a sign of body dysmorphic disorder (BDD), which is a serious illness. A doctor or nurse can help.",
        },
        {
          heading: "Building a kinder view of your body",
          body: "Body image can change with practice. Kind thoughts get easier with practice. Try to notice harsh thoughts about your body and swap them for fairer ones. Focusing on the parts of yourself you like can help. Learning to accept how you look is better for you than always trying to change it. Remember that many images in media and adverts are edited. Spending less time with content that makes you feel worse about yourself may help too.",
        },
        {
          heading: "When to get help",
          body: "Talk to a doctor or nurse if worries about your body take up a lot of your time or affect your mood, eating or daily life. Eating very little, exercising much more than usual, or losing your periods can be warning signs of an eating disorder. These are worth getting checked early, and support is available. If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information. If worries about your body are affecting your life, talk to a doctor or nurse.",
    },
  },
  {
    slug: "eating-disorders",
    category: "mind",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Eating disorders", href: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/eating-disorders/overview/" },
      { label: "NIMH — Eating disorders", href: "https://www.nimh.nih.gov/health/topics/eating-disorders" },
      { label: "NICHD — What causes amenorrhea?", href: "https://www.nichd.nih.gov/health/topics/amenorrhea/conditioninfo/causes" },
      { label: "NHS — Osteoporosis: causes", href: "https://www.nhs.uk/conditions/osteoporosis/causes/" },
    ],
    related: ["red-s", "body-image", "missed-periods"],
    en: {
      title: "Eating disorders",
      summary: "Eating disorders are serious mental health conditions, and they can be treated. Here are the signs, how they can affect periods, and how to get help early.",
      sections: [
        {
          heading: "What an eating disorder is",
          body: "An eating disorder is a mental health condition. People with an eating disorder may use food, or control over food, as a way to cope with hard feelings. Eating disorders are serious and can be life-threatening, but they can be treated successfully. Anyone can develop one, though teenagers and young adults are affected most often. You may be more likely to develop one if someone in your family has had an eating disorder, or if you live with anxiety or low self-esteem.",
        },
        {
          heading: "Types of eating disorder",
          body: "Anorexia involves trying to control your weight by not eating enough, exercising too much, or both. Bulimia means losing control over eating, then trying to get rid of the food or avoid weight gain in harmful ways. Binge eating disorder means regularly eating very large amounts of food, often feeling unable to stop, until you feel uncomfortably full. ARFID (avoidant restrictive food intake disorder) means avoiding certain foods, limiting how much you eat, or both. When symptoms do not fit one type, it may be called OSFED (other specified feeding or eating disorder).",
        },
        {
          heading: "Signs to look out for",
          body: "Signs include spending a lot of time worrying about your weight or body shape, eating very little, and exercising too much. Mood can change, with feeling withdrawn, anxious or low. Your body may also show signs, such as feeling cold, tired or dizzy, and bloating, constipation or diarrhoea. In someone else, you might notice them eating very fast, going to the toilet a lot after eating, or wearing loose, baggy clothes.",
        },
        {
          heading: "Why periods can stop",
          body: "Not getting your period is one of the signs of an eating disorder, and it is an important warning sign. When the body does not get enough food, a part of the brain called the hypothalamus can slow down the hormone that the cycle depends on. Periods may become irregular or stop. Oestrogen helps keep bones strong. The low oestrogen that comes with lost periods, together with poor nutrition, can weaken bones over time.",
        },
        {
          heading: "Getting help",
          body: "If you think you might have an eating disorder, see a doctor or nurse as soon as you can. Treatment usually includes talking therapy and regular health checks, and recovery looks different for everyone. Getting help early gives you the best chance of a full recovery. If you are worried about someone else, let them know you care and encourage them to see a doctor. Get emergency help if someone with an eating disorder faints, has chest pain, or has a very fast or uneven heartbeat. If you are thinking about harming yourself or ending your life, get emergency help or contact a crisis line now.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you are worried about your eating or someone else's, talk to a doctor or nurse.",
    },
  },
];
