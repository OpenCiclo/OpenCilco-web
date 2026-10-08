// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const FERTILITY_ARTICLES: LearnArticle[] = [
  {
    slug: "fertile-window",
    category: "fertility",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Periods and fertility in the menstrual cycle", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
      { label: "Planned Parenthood — Fertility awareness methods", href: "https://www.plannedparenthood.org/learn/birth-control/fertility-awareness" },
      { label: "Office on Women's Health — Trying to conceive", href: "https://www.womenshealth.gov/pregnancy/you-get-pregnant/trying-conceive" },
      { label: "NHS — Natural family planning", href: "https://www.nhs.uk/contraception/methods-of-contraception/natural-family-planning/" },
    ],
    related: ["ovulation", "fertility-awareness", "trying-to-conceive"],
    en: {
      title: "Your fertile window",
      summary: "You can only get pregnant during about a week of each cycle, around ovulation. Here is how the fertile window works and why any app's estimate is only a guide.",
      sections: [
        {
          heading: "What the fertile window is",
          body: "Your fertile window is the small number of days in each cycle when sex can lead to pregnancy. It depends on how long an egg and sperm can survive. After ovulation (when an ovary releases an egg), the egg lives for about 12 to 24 hours. Sperm can survive inside the body for up to 7 days after sex. So the window is about a week long: the days before ovulation and the day of ovulation itself.",
        },
        {
          heading: "When it usually falls",
          body: "Ovulation usually happens about 10 to 16 days before your next period. It does not always fall in the middle of the cycle. If you have a regular 28-day cycle, you are likely to be fertile around day 14, counting the first day of bleeding as day 1. In shorter cycles the window comes earlier, and in longer cycles it comes later. Getting pregnant soon after a period is not very likely, but it can happen if you ovulate early or have a short cycle.",
        },
        {
          heading: "Signs that ovulation is near",
          body: "Around ovulation, vaginal discharge (cervical mucus) often becomes clear, thin and stretchy, a bit like raw egg white. Ovulation tests can also help. They detect a sudden rise (surge) in a hormone called luteinising hormone (LH). The surge starts about 36 hours before ovulation. These signs can vary. Even in the same person, the number of days before ovulation can change from month to month.",
        },
        {
          heading: "Why any estimate is only a guide",
          body: "An app can only estimate a fertile window. It cannot see what your body is doing this month. Ciclo shows an estimated fertile window, but it cannot confirm that you have ovulated and it is not a form of contraception. Even fertility awareness methods, which track several body signs every day and are learned from a trained teacher, are only about 76% effective with typical use. That means about 24 in 100 people using them get pregnant in a year.",
        },
        {
          heading: "Planning or avoiding pregnancy",
          body: "If you are trying for a baby, you do not need to find the exact day. Having sex every 2 to 3 days through your cycle means sperm are likely to be there when you ovulate. If you want to avoid pregnancy, use a reliable method of contraception rather than an estimated fertile window. A doctor, nurse or sexual-health clinic can help you choose a method that suits you.",
        },
      ],
      notice: "This is general information. An estimated fertile window is not contraception. For help planning or avoiding pregnancy, talk to a doctor or nurse.",
    },
  },
  {
    slug: "fertility-awareness",
    category: "fertility",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Natural family planning", href: "https://www.nhs.uk/contraception/methods-of-contraception/natural-family-planning/" },
      { label: "Planned Parenthood — Fertility awareness methods", href: "https://www.plannedparenthood.org/learn/birth-control/fertility-awareness" },
      { label: "Office on Women's Health — Trying to conceive", href: "https://www.womenshealth.gov/pregnancy/you-get-pregnant/trying-conceive" },
    ],
    related: ["fertile-window", "ovulation-tests", "choosing-contraception"],
    en: {
      title: "Fertility awareness methods",
      summary: "Fertility awareness means tracking body signs to work out your fertile days. It can work well when learned properly, but with typical use it is much less reliable.",
      sections: [
        {
          heading: "What fertility awareness is",
          body: "Fertility awareness methods, also called natural family planning, help you work out the days in your cycle when you could get pregnant. You record signs from your body every day. To avoid pregnancy, you then avoid sex or use another method, such as condoms, on your fertile days. Some people use the same skills to time sex when they want a baby.",
        },
        {
          heading: "The signs you track",
          body: "There are several methods. The temperature method uses your body temperature at rest, which rises slightly just after ovulation. The cervical mucus method follows changes in your vaginal discharge, which becomes clear and slippery around ovulation. The calendar method uses the length of your past cycles. Using all three together, sometimes called the symptothermal method, is more effective than relying on one alone.",
        },
        {
          heading: "How effective it is",
          body: "Effectiveness depends a lot on how carefully the method is used. The NHS says that with perfect use, fertility awareness is between 91% and 99% effective at preventing pregnancy. With typical use, which allows for the mistakes people make in real life, it is only 76% effective: about 24 in 100 women using it get pregnant in a year.",
        },
        {
          heading: "Learning it properly matters",
          body: "Fertility awareness takes skill and commitment, and it works best when you learn it from someone trained. The NHS advises learning it from a health professional who is specially trained in fertility awareness. It says it can take 2 to 3 cycles to learn the method properly. You need to record your signs every day. The methods work less well if your cycles are irregular, so they may not suit everyone.",
        },
        {
          heading: "Apps, STIs and other limits",
          body: "Fertility awareness does not protect you from sexually transmitted infections (STIs), so use condoms as well if you could be at risk. Ciclo logs cervical mucus and ovulation tests but not temperature, and its fertile window is an estimate, not contraception. If you want help choosing a reliable method, talk to a doctor, nurse or sexual-health clinic.",
        },
      ],
      notice: "This is general information. Fertility awareness needs proper training to work well and does not protect against STIs. Ask a doctor or nurse about your options.",
    },
  },
  {
    slug: "trying-to-conceive",
    category: "fertility",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Trying to get pregnant", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/trying-to-get-pregnant/" },
      { label: "NHS — Infertility", href: "https://www.nhs.uk/conditions/infertility/" },
      { label: "CDC — Infertility FAQs", href: "https://www.cdc.gov/reproductive-health/infertility-faq/index.html" },
      { label: "Office on Women's Health — Preconception health", href: "https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health" },
      { label: "NHS — Vitamins, supplements and nutrition in pregnancy", href: "https://www.nhs.uk/pregnancy/keeping-well/vitamins-supplements-and-nutrition/" },
    ],
    related: ["fertile-window", "preconception-health", "infertility"],
    en: {
      title: "Trying to get pregnant",
      summary: "Most couples where the woman is under 40 get pregnant within a year of regular sex without contraception. Here is how timing works, what helps, and when to ask for help.",
      sections: [
        {
          heading: "How long it usually takes",
          body: "Getting pregnant often takes longer than people expect. More than 8 in 10 couples where the woman is under 40 get pregnant naturally within a year, if they have regular sex without contraception every 2 or 3 days. So it is common for it to take several months. Not getting pregnant in the first few cycles happens to many people.",
        },
        {
          heading: "Timing sex around ovulation",
          body: "You are most likely to get pregnant around ovulation, when an ovary releases an egg. This usually happens about 10 to 16 days before your next period, so it comes later in a long cycle and earlier in a short one. Sperm can live for up to 7 days, so sex in the days before ovulation counts. Having sex every 2 to 3 days through your cycle means you do not need to pinpoint the exact day.",
        },
        {
          heading: "Habits that help",
          body: "Take 400 micrograms of folic acid every day from before you try until you are 12 weeks pregnant, and ask about vitamin D too. Getting support to stop smoking and not drinking alcohol both help. A weight that is too low or too high can make it harder to get pregnant, so a doctor or nurse can help you aim for a healthy weight. If you take a prescribed medicine, do not stop it before talking to your doctor.",
        },
        {
          heading: "Your partner's health matters too",
          body: "Fertility problems can affect men as well as women. Poor-quality semen is one of the common reasons couples find it hard to conceive. A male partner can look after his own reproductive health by drinking less alcohol, stopping smoking or drug use, eating well and reducing stress. Couples where the man is 40 or older are also more likely to have difficulty conceiving.",
        },
        {
          heading: "When to ask for help",
          body: "See a doctor or nurse if you have been trying for a year or more. Go sooner if you are older: US guidance (CDC) advises seeing a doctor after 6 months of trying from age 35, and UK guidance (NHS) says women aged 36 and over should go sooner. Also go early if your periods are irregular or have stopped, you have endometriosis, or you already know of a possible fertility problem.",
        },
      ],
      notice: "This is general information. If you have a health condition or take regular medicines, talk to a doctor or nurse before you start trying.",
    },
  },
  {
    slug: "preconception-health",
    category: "fertility",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Preconception health", href: "https://womenshealth.gov/pregnancy/you-get-pregnant/preconception-health" },
      { label: "CDC — About folic acid", href: "https://www.cdc.gov/folic-acid/about/index.html" },
      { label: "NHS — Trying to get pregnant", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/trying-to-get-pregnant/" },
      { label: "NHS — Vitamins, supplements and nutrition in pregnancy", href: "https://www.nhs.uk/pregnancy/keeping-well/vitamins-supplements-and-nutrition/" },
    ],
    related: ["trying-to-conceive", "healthy-eating", "alcohol-smoking"],
    en: {
      title: "Getting healthy before pregnancy",
      summary: "A few steps before you conceive, such as taking folic acid and reviewing your medicines and vaccines, can help both you and a future baby.",
      sections: [
        {
          heading: "Why the months before matter",
          body: "Your health before pregnancy affects how the pregnancy goes. A baby's brain and spine start to form in the first few weeks, often before you know you are pregnant. About half of all pregnancies are not planned, so these steps are useful for anyone who could get pregnant. The US Office on Women's Health suggests starting to prepare at least 3 months before you get pregnant.",
        },
        {
          heading: "Folic acid",
          body: "Folic acid is a form of the vitamin folate. It helps prevent serious birth defects of the brain and spine (neural tube defects), such as spina bifida. The US Centers for Disease Control and Prevention (CDC) advises everyone who could become pregnant to get 400 micrograms of folic acid every day, and to start at least 1 month before trying. Keep taking it until you are 12 weeks pregnant. It comes in supplements and in some fortified foods, such as breakfast cereals. Ask a doctor before you start if you have diabetes, take medicine for epilepsy or HIV, or if you, the baby's biological father, a past pregnancy or either family has been affected by a neural tube defect. You may need a higher dose.",
        },
        {
          heading: "A check-up before you try",
          body: "A visit to a doctor or nurse before you try is a good chance to review your health. Tell them about every medicine you take, including medicines you buy yourself, herbal remedies and supplements. Do not stop a prescribed medicine on your own. Check that your vaccinations are up to date. If you have a long-term condition such as asthma, diabetes or epilepsy, ask how best to manage it before and during pregnancy.",
        },
        {
          heading: "Everyday habits",
          body: "Stop smoking and drinking alcohol before you try to get pregnant. A weight that is too low or too high can make it harder to get pregnant, so ask for support if you need it. Avoid harmful chemicals at work and at home, and stay away from cat and rodent droppings, which can spread infection. Partners can help their own health by drinking less, stopping smoking, eating well and reducing stress.",
        },
      ],
      notice: "This is general information. If you have a health condition or take regular medicines, talk to a doctor or nurse before you try to get pregnant.",
    },
  },
  {
    slug: "age-and-fertility",
    category: "fertility",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "CDC — Infertility FAQs", href: "https://www.cdc.gov/reproductive-health/infertility-faq/index.html" },
      { label: "Mayo Clinic — Pregnancy after 35", href: "https://www.mayoclinic.org/healthy-lifestyle/getting-pregnant/in-depth/pregnancy/art-20045756" },
      { label: "NHS — Infertility", href: "https://www.nhs.uk/conditions/infertility/" },
      { label: "CDC — About folic acid", href: "https://www.cdc.gov/folic-acid/about/index.html" },
    ],
    related: ["infertility", "trying-to-conceive", "healthy-pregnancy"],
    en: {
      title: "Age and fertility",
      summary: "Fertility falls with age, from around 30 and more steeply from the mid-30s. Most couples where the woman is under 40 still conceive within a year.",
      sections: [
        {
          heading: "Why fertility changes with age",
          body: "You are born with a limited supply of eggs. Over the years both the number of eggs and their quality go down. Lower egg quality is the main reason fertility falls with age. The change becomes more noticeable in the mid- to late 30s. Because of this, getting pregnant can take longer as you get older.",
        },
        {
          heading: "What the numbers say",
          body: "The US Centers for Disease Control and Prevention (CDC) says a woman's chance of having a baby falls quickly each year after about age 30. Even so, more than 8 in 10 couples where the woman is under 40 get pregnant within a year of regular sex without contraception. Age also raises the chance of miscarriage and of a baby having a genetic condition. A man's age matters too: couples where the man is 40 or older are more likely to have trouble conceiving.",
        },
        {
          heading: "Pregnancy after 35",
          body: "Many people have healthy pregnancies and babies after 35. Twins become more likely, and some risks are higher, including diabetes that starts in pregnancy (gestational diabetes), high blood pressure, a baby born early or small, and needing a caesarean birth. The risk of miscarriage, stillbirth and chromosome conditions also rises with age. Regular check-ups during pregnancy help.",
        },
        {
          heading: "Getting ready",
          body: "If you hope to get pregnant later in life, the same steps help at any age. Take folic acid, stop smoking and alcohol, and ask a doctor or nurse to review any health conditions and medicines before you try. Once you are pregnant, going to all your check-ups lets a doctor or midwife spot problems early.",
        },
        {
          heading: "When to get help",
          body: "If you are under 35, see a doctor or nurse after a year of trying. From 35, US guidance advises going after 6 months of trying, and UK guidance says women aged 36 and over should not wait a full year. If you are over 40, consider asking for tests straight away. At any age, go early if your periods are irregular or have stopped, or you know of a possible fertility problem.",
        },
      ],
      notice: "This is general information. Everyone's fertility is different. If you are worried about your age and fertility, talk to a doctor or nurse.",
    },
  },
  {
    slug: "infertility",
    category: "fertility",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "WHO — Infertility", href: "https://www.who.int/news-room/fact-sheets/detail/infertility" },
      { label: "NHS — Infertility", href: "https://www.nhs.uk/conditions/infertility/" },
      { label: "CDC — Infertility FAQs", href: "https://www.cdc.gov/reproductive-health/infertility-faq/index.html" },
    ],
    related: ["trying-to-conceive", "age-and-fertility", "pcos"],
    en: {
      title: "Infertility and when to get help",
      summary: "Infertility means not getting pregnant after a year of regular sex without contraception. It is common, affects men and women, and help is available.",
      sections: [
        {
          heading: "What infertility means",
          body: "Doctors call it infertility when a pregnancy does not happen after 12 months or more of regular sex without contraception. It is common. Worldwide, about 1 in 6 people of reproductive age are affected, according to the World Health Organization (WHO). It is called primary infertility if you have never been pregnant, and secondary infertility if you have been pregnant before.",
        },
        {
          heading: "Common causes",
          body: "Causes can come from either partner, from both, or remain unexplained. In women, common causes include not ovulating regularly, conditions of the ovaries such as PCOS (polycystic ovary syndrome, now also called PMOS), blocked or damaged fallopian tubes and endometriosis. Fibroids can sometimes play a part. In men, problems include low numbers of sperm, or sperm that are an unusual shape or do not move well. In about a quarter of cases, no cause is found.",
        },
        {
          heading: "Things that can affect fertility",
          body: "Fertility declines with age. Smoking, drinking a lot of alcohol, being overweight or underweight, and a lot of physical or emotional stress can also play a part. Some sexually transmitted infections (STIs) can affect fertility, too. Some of these factors can be changed, and a doctor or nurse can help with support to stop smoking or reach a healthy weight.",
        },
        {
          heading: "When to see a doctor",
          body: "If you are under 35, see a doctor or nurse after a year of trying. From 35, US guidance advises going after 6 months of trying, and UK guidance says women aged 36 and over should go sooner than a year. Over 40, it is worth asking for tests straight away. At any age, go early if your periods are irregular or have stopped, you have endometriosis, or you know of a possible problem. Your cycle history from Ciclo can help show the doctor your pattern.",
        },
        {
          heading: "Tests and treatment",
          body: "A doctor can arrange tests to look for a cause, in both partners where needed. Treatment depends on the cause. It may include medicines to help you ovulate, surgery, or assisted conception such as putting sperm directly into the womb (IUI, intrauterine insemination) or IVF (in vitro fertilisation, where eggs are fertilised in a lab and then put into the womb). Access and cost vary a lot between countries. Infertility can bring real stress, anxiety and low mood, so ask about emotional support as well.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you are worried about your fertility, talk to a doctor or nurse.",
    },
  },
  {
    slug: "ovulation-tests",
    category: "fertility",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "MedlinePlus — Ovulation home test", href: "https://medlineplus.gov/ency/article/007062.htm" },
      { label: "Office on Women's Health — Trying to conceive", href: "https://www.womenshealth.gov/pregnancy/you-get-pregnant/trying-conceive" },
      { label: "CDC — Infertility FAQs", href: "https://www.cdc.gov/reproductive-health/infertility-faq/index.html" },
    ],
    related: ["ovulation", "fertile-window", "fertility-awareness"],
    en: {
      title: "Ovulation tests and temperature tracking",
      summary: "Ovulation tests and temperature charts can help you find your most fertile days when trying for a baby. Here is how they work and what they cannot tell you.",
      sections: [
        {
          heading: "How ovulation tests work",
          body: "Ovulation tests check your pee for luteinising hormone (LH). A sudden rise in LH, called the LH surge, triggers ovulation. It starts about 36 hours before an egg is released. A positive test means you will probably ovulate in the next 24 to 36 hours. You are most fertile in the 2 to 3 days before ovulation and for up to about a day after it. This is a good time to have sex if you are trying for a baby.",
        },
        {
          heading: "When to start testing",
          body: "Start testing about 3 to 5 days before you expect to ovulate. Ovulation usually happens 10 to 16 days before your next period, so your usual cycle length helps you choose when to begin. You can pee on the test stick or dip it in pee collected in a clean container. Do not drink a lot of fluid before testing, and follow the instructions that come with your test.",
        },
        {
          heading: "What ovulation tests cannot tell you",
          body: "A positive test shows a rise in a hormone. It does not prove that an egg was released. If you skip a day of testing, you may miss the surge. Tests may also not pick up a surge if your cycles are irregular. Some hormone medicines and fertility medicines can change LH levels and the result. False positive results can happen, but they are rare.",
        },
        {
          heading: "Tracking your temperature",
          body: "Your body temperature at rest (basal body temperature) rises slightly just after ovulation, usually by only about 0.2 to 0.4°C (0.4 to 0.8°F). The rise shows that ovulation has probably happened, but not exactly when. Because your most fertile days come before your temperature reaches its highest point, a chart is most useful for learning your usual pattern over several cycles.",
        },
        {
          heading: "Logging and when to get help",
          body: "Ciclo lets you log ovulation test results and cervical mucus next to your periods, but it does not log temperature and cannot confirm that you have ovulated. If you have been trying for a year without getting pregnant, see a doctor or nurse. Go after 6 months if you are 35 or older, and sooner if your periods are irregular or have stopped.",
        },
      ],
      notice: "This is general information. Ovulation tests and temperature charts are not contraception. If you are having trouble getting pregnant, talk to a doctor or nurse.",
    },
  },
];
