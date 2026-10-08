// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const CYCLE_ARTICLES: LearnArticle[] = [
  {
    slug: "how-the-cycle-works",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
      { label: "NHS — Periods and fertility in the menstrual cycle", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
      { label: "OpenStax — Anatomy and Physiology 2e, 27.2 Anatomy and physiology of the ovarian reproductive system", href: "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system" },
    ],
    related: ["cycle-phases", "cycle-hormones", "normal-cycle-length"],
    en: {
      title: "How the menstrual cycle works",
      summary: "Each cycle, your body gets ready for a possible pregnancy and then resets with a period. Here is the big picture of what happens from one period to the next.",
      sections: [
        {
          heading: "What the cycle is for",
          body: "The menstrual cycle is a pattern of changes that repeats about once a month. It is run by hormones, which are chemical messengers in your blood. Each cycle, your body gets ready for a possible pregnancy. An egg ripens and is released, and the inner lining of the womb (uterus) grows thick. If you do not get pregnant, hormone levels fall and the lining comes away. That bleeding is your period (menstruation). Periods usually start at around age 12 and continue until menopause, which most often happens in the mid-40s to mid-50s.",
        },
        {
          heading: "How long a cycle lasts",
          body: "Day 1 of a cycle is the first day of period bleeding. The cycle runs until the day before your next period starts. Most adult cycles last somewhere between about 21 and 38 days. The average is around 28 days, but few people have exactly 28 every time, and the length can change from month to month. The period itself usually lasts 2 to 7 days, often about 5.",
        },
        {
          heading: "First half: an egg ripens",
          body: "During and after your period, the brain sends signals to the ovaries. Small sacs in the ovaries called follicles, each holding an egg, start to grow. As they grow, they make the hormone oestrogen. Oestrogen rebuilds the womb lining after your period and makes it thicker. It also makes the mucus from the neck of the womb (cervix) thinner and stretchier. Usually one follicle grows bigger than the rest, and its egg is the one that will be released.",
        },
        {
          heading: "Ovulation: the egg is released",
          body: "When oestrogen is high, the brain releases a burst of luteinising hormone (LH). This makes the leading follicle release its egg, which is called ovulation. It usually happens about 10 to 16 days before the next period, so the exact day depends on how long your cycle is. The egg moves into a fallopian tube, which carries it towards the womb. Pregnancy is most likely from sex in the days before and around ovulation, because sperm can survive in the body for up to 7 days.",
        },
        {
          heading: "Second half: the womb gets ready",
          body: "After ovulation, the empty follicle turns into a small structure called the corpus luteum. It makes the hormone progesterone, which keeps the womb lining thick and ready for a fertilised egg to settle in. If no pregnancy happens, the corpus luteum stops working. Oestrogen and progesterone then drop to low levels, and this tells the body to shed the lining. Your period starts, and a new cycle begins on its first day.",
        },
        {
          heading: "When to talk to a doctor or nurse",
          body: "Get advice if your cycles are regularly shorter than 24 days or longer than 38 days. Also get advice if you have no period for 3 months and are not pregnant or breastfeeding. If pain or bleeding stops you doing everyday things, get it checked, because treatment can help. Bleeding between periods, after sex or after menopause should always be checked by a doctor. Get urgent help if you bleed very heavily and feel dizzy or faint, or have sudden, severe pain in your lower tummy. Logging your periods in Ciclo can help you notice changes like these.",
        },
      ],
      notice: "This is general information about a typical cycle. Every body is different; if something about your cycle worries you, talk to a doctor or nurse.",
    },
  },
  {
    slug: "cycle-phases",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "OpenStax — Anatomy and Physiology 2e, 27.2 Anatomy and physiology of the ovarian reproductive system", href: "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system" },
      { label: "NHS — Periods and fertility in the menstrual cycle", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "Office on Women's Health — Trying to conceive", href: "https://womenshealth.gov/pregnancy/you-get-pregnant/trying-conceive" },
    ],
    related: ["how-the-cycle-works", "cycle-hormones", "fertile-window"],
    en: {
      title: "The four phases of your cycle",
      summary: "Your cycle is often split into four phases: menstrual, follicular, ovulation and luteal. Here is what happens in each one, and why any phase dates you see are only estimates.",
      sections: [
        {
          heading: "Four phases, two views",
          body: "Doctors describe the cycle from two angles. The ovaries go through a follicular phase, while an egg ripens, and a luteal phase, after the egg is released. The lining of the womb (uterus) is shed during your period, then builds up, then gets ready for a possible pregnancy. Put together, the cycle is often described in four phases: menstrual, follicular, ovulation and luteal. The number of days in each phase differs between people and from one cycle to the next.",
        },
        {
          heading: "Menstrual phase: your period",
          body: "The cycle starts on day 1, the first day of bleeding. Levels of the hormones oestrogen and progesterone are low, and this tells the body to shed the womb lining (endometrium) through the vagina. A period usually lasts 2 to 7 days, often about 5. Cramps are common, especially in the first days, because the muscle of the womb squeezes to push the lining out.",
        },
        {
          heading: "Follicular phase: building up",
          body: "The follicular phase covers the time from the start of your period until ovulation, so it overlaps with your period. Follicle-stimulating hormone (FSH), made by a small gland at the base of the brain, makes several follicles grow. These are small sacs in the ovary, each holding an egg. The follicles make oestrogen, which rebuilds and thickens the womb lining once bleeding stops. The length of this phase can change from month to month, even in the same person.",
        },
        {
          heading: "Ovulation: the egg is released",
          body: "When oestrogen gets high enough, the brain releases a surge of luteinising hormone (LH). This makes the leading follicle release its egg. Ovulation usually happens about 10 to 16 days before your next period. That is around day 14 in a 28-day cycle, but later in a longer cycle and earlier in a shorter one. Around this time, cervical mucus often becomes clear, wet and stretchy, and some people feel a twinge on one side of the lower tummy.",
        },
        {
          heading: "Luteal phase: ready, then resetting",
          body: "After ovulation, the empty follicle becomes a small structure called the corpus luteum, which makes progesterone. Progesterone keeps the womb lining thick and ready for a fertilised egg to settle in. The luteal phase usually lasts about 10 to 16 days. If there is no pregnancy, the corpus luteum stops working, hormone levels drop, the lining breaks down and a new period starts. In the days before a period, some people notice bloating, sore breasts or mood changes.",
        },
        {
          heading: "Why the phases are only estimates",
          body: "The phases and fertile window shown in Ciclo are estimates, and Ciclo is not contraception or a fertility test. A calendar cannot confirm whether or when you ovulated, because the day you ovulate can change from cycle to cycle. To avoid or plan a pregnancy, talk to a doctor, nurse or sexual-health clinic about reliable options.",
        },
      ],
      notice: "This is general information. Phase timings differ for everyone, and estimated phases cannot confirm ovulation or prevent pregnancy.",
    },
  },
  {
    slug: "cycle-hormones",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "OpenStax — Anatomy and Physiology 2e, 27.2 Anatomy and physiology of the ovarian reproductive system", href: "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system" },
      { label: "MedlinePlus — Follicle-stimulating hormone (FSH) levels test", href: "https://medlineplus.gov/lab-tests/follicle-stimulating-hormone-fsh-levels-test/" },
      { label: "MedlinePlus — Luteinizing hormone (LH) levels test", href: "https://medlineplus.gov/lab-tests/luteinizing-hormone-lh-levels-test/" },
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
    ],
    related: ["cycle-phases", "ovulation", "ovulation-tests"],
    en: {
      title: "Hormones across your cycle",
      summary: "Four main hormones run your cycle: FSH and LH from the brain, and oestrogen and progesterone from the ovaries. Here is what each one does, phase by phase.",
      sections: [
        {
          heading: "Signals between brain and ovaries",
          body: "Hormones are chemical messengers carried in your blood. Your cycle is run by signals passing between your brain and your ovaries. A part of the brain called the hypothalamus controls the pituitary gland. This small gland at the base of the brain makes two hormones, called FSH and LH, which act on the ovaries. The ovaries answer by making oestrogen and progesterone. These act on the womb (uterus) and also send signals back to the brain.",
        },
        {
          heading: "FSH: getting eggs ready",
          body: "FSH stands for follicle-stimulating hormone. Early in the cycle, it makes several follicles in the ovaries grow. Follicles are small sacs that each hold an egg, and FSH helps get an egg ready for release. As the follicles grow, they send out signals that slow FSH down again. Later in life, as the ovaries release fewer eggs, the body makes more FSH. So a high FSH level is expected around perimenopause and after menopause.",
        },
        {
          heading: "Oestrogen: the first half",
          body: "The growing follicles make oestrogen, so its level climbs through the first half of the cycle. Oestrogen rebuilds and thickens the womb lining (endometrium) after your period. It also makes the mucus from the neck of the womb (cervix) thinner and stretchier as ovulation gets close. For most of the cycle, oestrogen keeps FSH and LH in check. But when it reaches a high level just before ovulation, it does the opposite and triggers a big release of LH.",
        },
        {
          heading: "LH: the trigger for ovulation",
          body: "LH stands for luteinising hormone. Like FSH, it is made by the pituitary gland. For most of the cycle it stays fairly low, then it rises quickly in what is called the LH surge. The surge starts about 36 hours before ovulation and peaks about 12 hours before. It makes the ripest follicle release its egg. Home ovulation tests work by detecting this rise in LH.",
        },
        {
          heading: "Progesterone: the second half",
          body: "After ovulation, the empty follicle turns into the corpus luteum, a short-lived structure that makes large amounts of progesterone. Progesterone gets the womb lining ready for a fertilised egg to settle in (implantation). It also keeps FSH and LH low, so no new eggs ripen in the meantime. Doctors call this part of the womb's cycle the secretory phase.",
        },
        {
          heading: "When levels fall, a period starts",
          body: "If there is no pregnancy, the corpus luteum stops making progesterone after about 10 to 12 days. Oestrogen and progesterone both drop to very low levels, and this tells the body to shed the womb lining as a period. With progesterone gone, the brain can make more FSH again, and a new group of follicles starts to grow. Because these hormones change through the month, a doctor may ask for a blood test at a certain point in your cycle.",
        },
      ],
      notice: "This is general information. Hormone levels differ between people and across the month; a doctor or nurse can explain what any test results mean for you.",
    },
  },
  {
    slug: "ovulation",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Periods and fertility in the menstrual cycle", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
      { label: "NHS — Ovulation pain", href: "https://www.nhs.uk/conditions/ovulation-pain/" },
      { label: "Office on Women's Health — Trying to conceive", href: "https://womenshealth.gov/pregnancy/you-get-pregnant/trying-conceive" },
      { label: "OpenStax — Anatomy and Physiology 2e, 27.2 Anatomy and physiology of the ovarian reproductive system", href: "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system" },
      { label: "healthdirect — Fertility awareness (natural family planning)", href: "https://www.healthdirect.gov.au/fertility-awareness-natural-family-planning" },
    ],
    related: ["fertile-window", "cervical-mucus", "ovulation-tests"],
    en: {
      title: "Ovulation and its signs",
      summary: "Ovulation is when an ovary releases an egg, usually 10 to 16 days before your next period. Here is when it happens, the signs some people notice, and what a calendar cannot tell you.",
      sections: [
        {
          heading: "What happens at ovulation",
          body: "Ovulation is the moment one of your ovaries lets go of an egg. In the days before, the egg ripens inside a small sac called a follicle. A sudden rise in luteinising hormone (LH) then makes the follicle let the egg go. The egg moves into the nearby fallopian tube, where tiny hairs help carry it towards the womb (uterus). If sperm reach the egg in the tube, it can be fertilised there.",
        },
        {
          heading: "When it happens",
          body: "Ovulation usually happens about 10 to 16 days before your next period starts. In a 28-day cycle, that is around day 14. In a 35-day cycle, it would be closer to day 21. The number of days before ovulation can differ between people, and from month to month in the same person. This is why ovulation does not fall on the same cycle day every time, and why a calendar can only estimate it.",
        },
        {
          heading: "Signs you might notice",
          body: "Signs vary from person to person. In the days before ovulation, cervical mucus often gets wetter, clearer and stretchy, a bit like raw egg white. Some people feel ovulation pain. This is a dull ache or sharp twinges on one side of the lower tummy, lasting from a few minutes to 1 or 2 days. A little spotting or extra discharge can happen too. Your body temperature at rest rises slightly just after ovulation, so by the time you see the rise, your most fertile days have usually passed.",
        },
        {
          heading: "Your fertile window",
          body: "Once it is released, the egg lives for only about 12 to 24 hours. Sperm, though, can survive in the body for up to 7 days after sex. So pregnancy is possible from sex in the days before ovulation as well as on the day itself. These days together are called the fertile window. Because ovulation can come earlier than expected, pregnancy is also possible soon after a period, although it is less likely.",
        },
        {
          heading: "What a calendar cannot tell you",
          body: "The ovulation phase and fertile window shown in Ciclo are estimates, not a test, and Ciclo is not contraception. A calendar cannot confirm that you ovulated, or exactly when. Home ovulation tests look for the LH surge, and a doctor can check your hormone levels with a blood test if needed. If you want to avoid pregnancy, ask a doctor, nurse or sexual-health clinic about reliable methods.",
        },
        {
          heading: "When to get checked",
          body: "See a doctor or nurse if pain in the middle of your cycle does not ease with painkillers or keeps coming back. Pain like this sometimes has another cause, such as endometriosis, an ovarian cyst or an infection like chlamydia. Get help the same day if the pain is severe and painkillers have not helped. If you might be pregnant, even without a positive test, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of a pregnancy growing outside the womb (ectopic pregnancy).",
        },
      ],
      notice: "This is general information. Estimated ovulation dates are not a test and not contraception. For sudden or severe pain, get medical help.",
    },
  },
  {
    slug: "cervical-mucus",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Planned Parenthood — What is the cervical mucus method?", href: "https://www.plannedparenthood.org/learn/birth-control/fertility-awareness/whats-cervical-mucus-method-fams" },
      { label: "NHS — Vaginal discharge", href: "https://www.nhs.uk/conditions/vaginal-discharge/" },
      { label: "Office on Women's Health — Trying to conceive", href: "https://womenshealth.gov/pregnancy/you-get-pregnant/trying-conceive" },
      { label: "NHS — Natural family planning (fertility awareness)", href: "https://www.nhs.uk/contraception/methods-of-contraception/natural-family-planning/" },
      { label: "NHS inform — Natural family planning (fertility awareness)", href: "https://www.nhsinform.scot/healthy-living/contraception/natural-family-planning-fertility-awareness/" },
    ],
    related: ["vaginal-discharge", "ovulation", "fertility-awareness"],
    en: {
      title: "Cervical mucus through the cycle",
      summary: "The mucus from your cervix changes through your cycle as hormones rise and fall. Knowing your usual pattern helps you understand your body and notice when something is different.",
      sections: [
        {
          heading: "What cervical mucus is",
          body: "The neck of the womb (cervix) makes mucus, which you see as part of your vaginal discharge, on your underwear or on toilet paper. Healthy discharge keeps the vagina clean and moist and helps protect it from infection. It can be clear or white, and thick and sticky or slippery and wet. It should not have a strong or unpleasant smell. How much there is and how it feels changes through the cycle, mostly because of the hormone oestrogen.",
        },
        {
          heading: "The usual pattern",
          body: "During your period, blood hides any mucus. For a few days afterwards, many people feel dry and notice little or none. As oestrogen rises, mucus increases. At first it is often sticky, and white or cloudy. It may then become creamy. Closer to ovulation it gets wetter and more watery. Just before ovulation there is usually the most, and it is clear, slippery and stretchy, like raw egg white. After ovulation there is often less, and it becomes thicker and stickier again until your next period.",
        },
        {
          heading: "Five types of mucus",
          body: "Mucus is often described in five types. Dry means little or no mucus. Sticky is thick and holds together. Creamy is smooth and white or cloudy, and often comes as your fertile days begin. Watery is thin, wet and clear. Egg white is clear and slippery and stretches between your fingers. Watery and egg-white mucus usually come closest to ovulation, when you are most fertile. Not everyone notices every type in every cycle, and it can take a few cycles of daily checks to learn your own pattern.",
        },
        {
          heading: "How to check",
          body: "The easiest way is to look at the mucus on white toilet paper when you wipe before you pee, or on your underwear. You can also use clean fingers. Notice the colour, how wet it feels and whether it stretches. Some things can change mucus and make it harder to read. These include sex, lubricant, hormonal contraception and some other medicines, breastfeeding, douching and vaginal infections, including sexually transmitted infections (STIs).",
        },
        {
          heading: "What mucus can and cannot tell you",
          body: "Clear, slippery, egg-white mucus is a sign that you are probably near ovulation, in your most fertile days. But it is a sign, not proof that you have ovulated. Ciclo lets you log these five types, but the phases and fertile window it shows are estimates, and it is not contraception or a fertility test. Using mucus to avoid pregnancy takes careful daily checks, and it usually takes 3 to 6 cycles to learn. With typical use, fertility awareness methods are only about 76% effective, and they do not protect against STIs. A doctor, nurse or sexual-health clinic can advise you.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Changes through the cycle are normal. See a doctor or nurse, or go to a sexual-health clinic, if your discharge has a strong or unpleasant smell, changes colour, or looks green, yellow or frothy. Also get checked if you have itching, soreness, pelvic pain or pain when you pee. The same goes for bleeding between periods or after sex, or a sudden change from your usual pattern. These can be signs of an infection such as thrush, bacterial vaginosis or an STI. Get urgent help if you have sudden, severe pain in your lower tummy.",
        },
      ],
      notice: "This is general information. If your discharge smells strong, itches, hurts or suddenly changes, see a doctor or nurse.",
    },
  },
  {
    slug: "normal-cycle-length",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NICHD — About menstruation", href: "https://www.nichd.nih.gov/health/topics/menstruation/conditioninfo" },
    ],
    related: ["irregular-periods", "tracking-your-cycle", "heavy-periods"],
    en: {
      title: "What counts as a normal cycle",
      summary: "Most adult cycles last between about 21 and 38 days, and periods last 2 to 7 days. Some change from month to month is normal. Here is what to expect and when to get checked.",
      sections: [
        {
          heading: "Normal ranges for adults",
          body: "Your cycle length is counted from the first day of one period up to the day before the next one starts. Health bodies give slightly different normal ranges. The US Office on Women's Health says 24 to 38 days, and the NHS says 21 to 35 days. Put together, most adult cycles last somewhere between about 21 and 38 days. The average is around 28 days, but few people have exactly 28 days every time.",
        },
        {
          heading: "Some change is normal",
          body: "Your cycle does not need to be the same length every month. It varies between people, and from month to month in the same person. Your periods still count as regular if they usually come within the normal range. Logging your period dates in Ciclo for a few months shows you your own usual range, which tells you more than comparing yourself with an average.",
        },
        {
          heading: "How long periods last",
          body: "A period usually lasts 2 to 7 days, most often about 5. Over a whole period, most people lose about 20 to 90 ml of blood, roughly 1 to 5 tablespoons, although some bleed more heavily. Get checked if bleeding lasts more than 7 days. Also get checked if you need a new pad or tampon every 1 to 2 hours.",
        },
        {
          heading: "How cycles change with age",
          body: "For a few years after periods start, cycles longer than 38 days are common. They usually become more regular within about 3 years. If they are still long or irregular after that, see a doctor or nurse. In your 20s and 30s, cycles tend to be regular. In your 40s, as the body starts moving towards menopause (perimenopause), cycles may become irregular again. Periods stop at menopause, usually in the mid-40s to mid-50s.",
        },
        {
          heading: "What can change your cycle",
          body: "Periods stop in pregnancy, and if you breastfeed, they can take a while to come back. Long-term stress can make periods irregular. Gaining or losing a lot of weight can make you miss periods, and very low body fat can stop ovulation. Health conditions such as thyroid problems and polycystic ovary syndrome (PCOS) can affect your cycle, and so can some medicines, including some for epilepsy or anxiety. Hormonal contraception and exercising very hard can also change your periods.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Talk to a doctor or nurse if your cycles are regularly shorter than 24 days or longer than 38 days, or if regular periods become irregular. Also talk to one if you have no period for 3 months and are not pregnant or breastfeeding. Bleeding between periods or after sex should be checked too. Get urgent help if you are bleeding very heavily and feel dizzy, faint or very weak.",
        },
      ],
      notice: "This is general information. Your own normal may differ from the average; if your cycle changes or worries you, talk to a doctor or nurse.",
    },
  },
  {
    slug: "reproductive-anatomy",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "OpenStax — Anatomy and Physiology 2e, 27.2 Anatomy and physiology of the ovarian reproductive system", href: "https://openstax.org/books/anatomy-and-physiology-2e/pages/27-2-anatomy-and-physiology-of-the-ovarian-reproductive-system" },
      { label: "Planned Parenthood — What are the parts of the female sexual anatomy?", href: "https://www.plannedparenthood.org/learn/health-and-wellness/sexual-and-reproductive-anatomy/what-are-parts-female-sexual-anatomy" },
      { label: "Planned Parenthood — Sexual and reproductive anatomy", href: "https://www.plannedparenthood.org/learn/health-and-wellness/sexual-and-reproductive-anatomy" },
      { label: "NHS — Vaginal discharge", href: "https://www.nhs.uk/conditions/vaginal-discharge/" },
    ],
    related: ["how-the-cycle-works", "vaginal-discharge", "intimate-hygiene"],
    en: {
      title: "Your reproductive anatomy",
      summary: "A plain guide to the vulva, vagina, cervix, womb, fallopian tubes and ovaries: where each part is and what it does. Every body looks a little different, and that is normal.",
      sections: [
        {
          heading: "Vulva and vagina are not the same",
          body: "The vulva is the part you can see on the outside. It includes the outer and inner lips (labia), the clitoris, the opening you pee from and the vaginal opening. The vagina is the stretchy tube inside, which leads from the vaginal opening up to the neck of the womb (cervix). Many people say vagina when they mean vulva. Knowing the right words can make it easier to describe a problem to a doctor or nurse.",
        },
        {
          heading: "The parts of the vulva",
          body: "At the front, over the pubic bone, is a soft pad of fatty tissue. The outer lips are fleshy and usually covered with pubic hair, and the thinner inner lips sit inside them. Labia vary a lot in size, shape and colour, and it is common for the two sides to look different. The tip of the clitoris is at the top, where the inner lips meet. It is very sensitive, and it is larger than it looks, because much of it lies inside the body. Below it is the opening of the urethra, where pee comes out, then the vaginal opening, and further back the anus.",
        },
        {
          heading: "The vagina",
          body: "The vagina is a muscular canal about 10 cm long. Its walls have folds that let it stretch. Period blood leaves the body through it, and babies are born through it. A thin piece of tissue called the hymen may partly cover the opening, and hymens vary a lot. Glands near the opening make fluid that keeps the vagina wet during arousal. Healthy bacteria inside keep it acidic, which helps protect it from infection, and normal discharge keeps it clean.",
        },
        {
          heading: "The cervix and womb",
          body: "The cervix is the narrow lower end of the womb (uterus), at the top of the vagina. It has a tiny opening that lets period blood out and sperm in, and it makes the mucus that changes through your cycle. The womb is a hollow organ with thick muscle walls. When you are not pregnant, it is roughly 7 cm long and 5 cm wide. Its inner lining (endometrium) builds up and sheds each cycle. Its thick muscle wall is what squeezes during period cramps.",
        },
        {
          heading: "Fallopian tubes and ovaries",
          body: "Two fallopian tubes lead from the womb towards the ovaries. Their ends have finger-like edges, and tiny hairs inside the tubes help carry an egg towards the womb. An egg is often fertilised inside the tube. The two ovaries are each about 2 to 3 cm long, about the size of an almond. They store eggs and make hormones, including oestrogen, progesterone and testosterone. At birth, the ovaries hold about 1 to 2 million immature eggs. By puberty, about 400,000 remain.",
        },
        {
          heading: "Every body is different",
          body: "Bodies vary a lot, and differences in size, shape or colour are usually normal. Some people are born with bodies that do not fit typical ideas of female or male. This is called being intersex. See a doctor or nurse if you notice sores, blisters, a new lump or a change in the skin of your vulva. Also go if you have itching, soreness, pain, a change in your discharge, or bleeding between periods or after sex.",
        },
      ],
      notice: "This is general information. Every body is a little different; if something is new, painful or worrying, talk to a doctor or nurse.",
    },
  },
  {
    slug: "tracking-your-cycle",
    category: "cycle",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Your menstrual cycle", href: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle" },
      { label: "Office on Women's Health — Period problems", href: "https://www.womenshealth.gov/menstrual-cycle/period-problems" },
      { label: "NICHD — About menstruation", href: "https://www.nichd.nih.gov/health/topics/menstruation/conditioninfo" },
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
    ],
    related: ["tracking-for-doctor", "normal-cycle-length", "irregular-periods"],
    en: {
      title: "Tracking your cycle",
      summary: "A simple record of your periods and symptoms helps you learn your own pattern and notice changes early. Here is how to count your cycle and what is worth noting.",
      sections: [
        {
          heading: "Counting day 1 and cycle length",
          body: "Day 1 of your cycle is the first day of period bleeding. Your cycle runs until the day before your next period starts. To find your cycle length, count the days from one day 1 up to the day before the next. For example, if one period starts on 3 March and the next on 31 March, that cycle was 28 days long. Your period length is the number of days you bleed, usually 2 to 7.",
        },
        {
          heading: "What is worth noting",
          body: "Start with the basics: the day your period starts, how many days it lasts and how heavy the bleeding is. Then add anything that matters to you, such as cramps or other pain, headaches, bloating, sore breasts, mood changes, or changes in cervical mucus. Note any spotting or bleeding outside your period too. A short note about stress or other big changes in your life can help you make sense of an unusual cycle later.",
        },
        {
          heading: "Patterns matter more than one cycle",
          body: "One cycle that is shorter, longer or heavier than usual can happen to anyone, because cycles naturally vary from month to month. A pattern over several cycles tells you much more. After a few months you can see your usual range, how long your periods last and when symptoms tend to appear. That makes it easier to spot a real change, such as cycles that become much shorter or longer, or periods that get heavier or more painful.",
        },
        {
          heading: "A sign of your overall health",
          body: "Your cycle can reflect what is going on in the rest of your body. Long-term stress, big weight changes, thyroid problems and conditions such as polycystic ovary syndrome (PCOS) can all make periods irregular or stop them. Pain or bleeding that stops you doing everyday things is not something you have to live with, and treatment can help. A written record of your periods and symptoms can help a doctor or nurse find the cause of a problem.",
        },
        {
          heading: "Why predictions are estimates",
          body: "Ciclo shows period predictions, estimated phases and a fertile window. These are estimates, not measurements. Cycle length can change from month to month, even in the same person, so a prediction can be off by several days. A prediction cannot confirm that you ovulated, and it cannot be used as contraception.",
        },
        {
          heading: "When to talk to a doctor or nurse",
          body: "Get advice if your cycles are regularly shorter than 24 days or longer than 38 days, or if regular periods become irregular. Also get advice if you go 3 months without a period and are not pregnant or breastfeeding. See a doctor or nurse about bleeding between periods or after sex. Also go if a period lasts more than 7 days, or if painkillers do not help your period pain. Get urgent help if you bleed very heavily and feel dizzy or faint, or have sudden, severe pain in your lower tummy.",
        },
      ],
      notice: "This is general information. App predictions are estimates; if your cycle changes or something worries you, talk to a doctor or nurse.",
    },
  },
];
