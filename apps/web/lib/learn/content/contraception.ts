// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const CONTRACEPTION_ARTICLES: LearnArticle[] = [
  {
    slug: "choosing-contraception",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — How well contraception works at preventing pregnancy", href: "https://www.nhs.uk/contraception/choosing-contraception/how-well-it-works-at-preventing-pregnancy/" },
      { label: "NHS — Choosing a method of contraception", href: "https://www.nhs.uk/contraception/choosing-contraception/" },
      { label: "Office on Women's Health — Birth control methods", href: "https://www.womenshealth.gov/a-z-topics/birth-control-methods" },
      { label: "CDC — Contraception and birth control methods", href: "https://www.cdc.gov/contraception/about/index.html" },
    ],
    related: ["iud", "the-pill", "condoms"],
    en: {
      title: "Choosing contraception",
      summary: "There are many ways to prevent pregnancy. This guide compares how well each method works, how you use it, and what to weigh up when you choose.",
      sections: [
        {
          heading: "What to weigh up",
          body: "There is no single best method for everyone. When you compare options, think about how well each one prevents pregnancy, how you use it, its possible side effects and risks, and how it may change your periods. Your health matters too. For example, methods that contain the hormone oestrogen may not be safe if you smoke and are 35 or over. A doctor, nurse or sexual-health clinic can help you find a method that fits your life and your health.",
        },
        {
          heading: "Perfect use and typical use",
          body: "Effectiveness is often given as two numbers. Perfect use means using a method correctly every single time. Typical use is how well a method works in everyday life. Mistakes happen, such as a late pill or a condom that slips. For methods you have to remember, the typical-use figure is lower. For the implant and the IUDs, which keep working for years once fitted, the two figures are the same.",
        },
        {
          heading: "Methods that last for years",
          body: "The implant, the hormonal IUD and the copper IUD are over 99% effective in both perfect and typical use. That means fewer than 1 in 100 people using them get pregnant in a year. The implant is a small rod placed under the skin of your arm. An IUD, also called a coil, is a small T-shaped device placed in the womb (uterus). Each lasts for several years. When the implant or a copper IUD is taken out, your fertility returns straight away.",
        },
        {
          heading: "Pill, patch, ring and injection",
          body: "These hormonal methods are over 99% effective with perfect use. With typical use, the injection is about 94% effective, and the pill, patch and vaginal ring are about 91% effective. In other words, around 9 in 100 people using the pill, patch or ring for a year get pregnant. The pill is taken daily, the patch is changed each week, and one injection lasts 8 to 13 weeks. After the injection, it can take up to a year for fertility to return.",
        },
        {
          heading: "Condoms and other methods",
          body: "External (male) condoms are 98% effective with perfect use and about 82% with typical use. Internal (female) condoms are 95% and about 79%. Condoms are the only method that also lowers the risk of sexually transmitted infections (STIs), including HIV, so they are worth using alongside another method if STIs are a concern. Natural family planning is about 91 to 99% effective with perfect use, but only about 76% with typical use. Period-tracking apps, including Ciclo, are not a form of contraception.",
        },
        {
          heading: "If something goes wrong",
          body: "If you have sex without contraception, or your method fails, emergency contraception can help prevent pregnancy. It needs to be used within 3 to 5 days, depending on the type, and it works better the sooner you use it. A copper IUD fitted as emergency contraception is the most effective option. Whatever you choose, a doctor, nurse or pharmacist can give you advice, and you can switch to another method if one does not suit you.",
        },
      ],
      notice: "This is general information. A doctor, nurse or sexual-health clinic can help you choose the method that is safest and best for you.",
    },
  },
  {
    slug: "the-pill",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Side effects and risks of the combined pill", href: "https://www.nhs.uk/contraception/methods-of-contraception/combined-pill/side-effects/" },
      { label: "NHS — Who can take the combined pill", href: "https://www.nhs.uk/contraception/methods-of-contraception/combined-pill/who-can-take-it/" },
      { label: "NHS — How to take the progestogen-only pill", href: "https://www.nhs.uk/contraception/methods-of-contraception/progestogen-only-pill/how-to-take-it/" },
      { label: "CDC — Combined hormonal contraceptives (US guidance for clinicians)", href: "https://www.cdc.gov/contraception/hcp/usspr/combined-hormonal-contraceptives.html" },
      { label: "NHS — Blood clots", href: "https://www.nhs.uk/conditions/blood-clots/" },
    ],
    related: ["periods-on-birth-control", "emergency-contraception", "delaying-a-period"],
    en: {
      title: "The pill",
      summary: "The pill comes in two main types: combined and progestogen-only. Here is how each works, how well it protects, common side effects and who may need a different method.",
      sections: [
        {
          heading: "Two main types",
          body: "The combined pill contains two hormones, oestrogen and progestogen. The progestogen-only pill, sometimes called the mini pill, contains only progestogen, a hormone that acts like the body's own progesterone. Both types work mainly by stopping the ovaries from releasing an egg each month. You take the progestogen-only pill every day, with no break between packs. With the combined pill, you usually take 1 hormone pill a day for 3 weeks, and many packs then have a week without hormones. Each type, and each brand, has its own instructions, so read the leaflet in your pack.",
        },
        {
          heading: "How well it protects",
          body: "If you take it correctly every day, either type of pill is over 99% effective. In real life, pills are sometimes missed or taken late, and typical use is about 91% effective. That means around 9 in 100 people using the pill for a year get pregnant. Being sick or having diarrhoea can also affect how well it works, and the pack leaflet explains what to do. The pill does not protect against sexually transmitted infections (STIs).",
        },
        {
          heading: "Missed or late pills",
          body: "What to do depends on your pill, so check the leaflet or ask a pharmacist. As a general guide, if you miss one combined pill, take it as soon as you remember, even if that means 2 pills in one day. If you miss 2 or more in a row, take the latest one, carry on, and use condoms until you have taken 7 pills in a row. A progestogen-only pill counts as missed when it is more than 3, 12 or 24 hours late, depending on the type. If you had sex after a missed pill, ask about emergency contraception.",
        },
        {
          heading: "Common side effects",
          body: "Bleeding between periods (breakthrough bleeding) and other changes to your bleeding are common in the first few months. Some people get headaches, mood changes or sore breasts, or feel sick or dizzy. The progestogen-only pill can cause spotting or bleeding between periods. There is no evidence that the combined pill makes you put on weight or changes your sex drive. If side effects still bother you after 3 months, talk to a pharmacist or doctor.",
        },
        {
          heading: "Rare but serious risks",
          body: "The combined pill carries a small risk of a blood clot in the leg or lung. This is rare and affects up to 1 in 1,000 people using combined hormonal contraception. Very rarely, a clot can cause a heart attack or a stroke. Get help urgently if one leg becomes painful or swollen, often in the calf or thigh, or the skin there looks red or darker. Call your local emergency number if you also feel short of breath or have chest pain. The pill can slightly raise the risk of breast and cervical cancer, and it lowers the risk of womb, ovarian and bowel cancer.",
        },
        {
          heading: "Who may need a different method",
          body: "The combined pill is not safe for everyone. You may not be able to take it if you smoke and are 35 or over, or are living with obesity. The same applies if you have had a blood clot, a stroke, heart disease or high blood pressure. Migraine with aura (warning signs before the headache), breast cancer, some liver and gallbladder problems, diabetes complications, or a close relative with a blood clot before 45 can also rule it out. If you are breastfeeding, wait until 6 weeks after the birth. Talk to a doctor, nurse or pharmacist if any of these apply. Logging each pill in Ciclo gives you a record to check if you are not sure whether you took one.",
        },
      ],
      notice: "This is general information. Follow your pill's leaflet, and ask a pharmacist, doctor or nurse if you miss a pill or are unsure what to do.",
    },
  },
  {
    slug: "iud",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — What is an IUD?", href: "https://www.nhs.uk/contraception/methods-of-contraception/iud-coil/what-is-it/" },
      { label: "NHS — Side effects and risks of the IUD", href: "https://www.nhs.uk/contraception/methods-of-contraception/iud-coil/side-effects/" },
      { label: "Office on Women's Health — Birth control methods", href: "https://www.womenshealth.gov/a-z-topics/birth-control-methods" },
      { label: "NHS — How well contraception works at preventing pregnancy", href: "https://www.nhs.uk/contraception/choosing-contraception/how-well-it-works-at-preventing-pregnancy/" },
    ],
    related: ["periods-on-birth-control", "emergency-contraception", "implant"],
    en: {
      title: "IUDs (hormonal and copper)",
      summary: "An IUD, or coil, is a small T-shaped device placed in the womb that prevents pregnancy for years. Copper and hormonal IUDs work differently and affect periods differently.",
      sections: [
        {
          heading: "What an IUD is",
          body: "An intrauterine device (IUD), often called a coil, is a small T-shaped piece of plastic that a doctor or nurse places inside the womb (uterus). There are two main kinds. The copper IUD contains no hormones. It releases copper into the womb, which stops sperm from reaching an egg. The hormonal IUD, also called an IUS, releases the hormone progestogen. It works in more than one way. It mainly keeps sperm away from an egg, and in some people it also stops an egg being released or makes the womb less likely to accept one.",
        },
        {
          heading: "How well it works",
          body: "Both types are over 99% effective. Because there is nothing to remember once it is in place, typical use is the same as perfect use: fewer than 1 in 100 people using an IUD get pregnant in a year. A copper IUD works as soon as it is fitted and lasts 5 or 10 years, depending on the type. A hormonal IUD also lasts for several years, depending on the type. A copper IUD can be used as emergency contraception too. Neither type protects against sexually transmitted infections (STIs).",
        },
        {
          heading: "Effects on your periods",
          body: "The two types tend to change bleeding in different ways. With a copper IUD, periods may become heavier, longer or more painful, and you may bleed between periods. This may improve after a few months. A hormonal IUD tends to make bleeding lighter or irregular, and for some people periods stop. Logging your bleeding in Ciclo can help you see whether a new pattern is settling.",
        },
        {
          heading: "Fitting and removal",
          body: "A doctor or nurse fits the IUD at an appointment. You may have period-like pain for a few days afterwards. When you want to stop using it, or when it needs replacing, a doctor or nurse can take it out. Once a copper IUD is removed, your fertility goes back to what it was before straight away.",
        },
        {
          heading: "Possible risks",
          body: "Possible risks with a copper IUD include a pelvic infection, usually within 3 weeks of fitting, and the IUD moving or coming out, usually within 3 months. Other possible risks are damage to the womb and, in the rare case that the IUD fails, a pregnancy outside the womb (ectopic pregnancy). There is also a small chance of thrush that keeps coming back.",
        },
        {
          heading: "When to get help",
          body: "Contact a doctor or nurse urgently if you have pain low in your tummy that painkillers do not help, or sudden tummy pain that gets worse or does not go away. Also get help quickly if you have a high temperature, abnormal or smelly discharge, very heavy bleeding, or you cannot feel the IUD threads or they feel different. Get emergency help if you have severe pain, especially on one side, and you think you could be pregnant.",
        },
      ],
      notice: "This is general information. A doctor or nurse can help you decide whether an IUD suits you and which type is best for you.",
    },
  },
  {
    slug: "implant",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — What is the contraceptive implant?", href: "https://www.nhs.uk/contraception/methods-of-contraception/contraceptive-implant/what-is-it/" },
      { label: "NHS — How well contraception works at preventing pregnancy", href: "https://www.nhs.uk/contraception/choosing-contraception/how-well-it-works-at-preventing-pregnancy/" },
      { label: "Office on Women's Health — Birth control methods", href: "https://www.womenshealth.gov/a-z-topics/birth-control-methods" },
      { label: "Mayo Clinic — Delaying your period with hormonal birth control", href: "https://www.mayoclinic.org/tests-procedures/combination-birth-control-pills/in-depth/womens-health/art-20044044" },
    ],
    related: ["periods-on-birth-control", "choosing-contraception", "iud"],
    en: {
      title: "The implant",
      summary: "The implant is a small rod placed under the skin of your arm. It releases a hormone that prevents pregnancy for years, with nothing to remember day to day.",
      sections: [
        {
          heading: "What the implant is",
          body: "The contraceptive implant is a small plastic rod, about 4 cm long, roughly the length of a matchstick. A doctor or nurse places it under the skin of your arm. It slowly releases progestogen, a hormone that acts like the body's own progesterone. This stops the ovaries from releasing an egg each month, so there is no egg for sperm to reach. The implant does not contain oestrogen.",
        },
        {
          heading: "How well it works",
          body: "The implant is over 99% effective, as long as it is replaced on time. Because there is nothing to remember, the result is the same with perfect use and typical use: fewer than 1 in 100 people using it get pregnant in a year. That makes it one of the most effective methods there is. How long it lasts depends on local guidance. The NHS says 5 years, and the US Office on Women's Health says up to 3 years. The clinic that fitted yours will tell you when to replace it.",
        },
        {
          heading: "Changes to your bleeding",
          body: "Irregular bleeding is a known side effect of the implant. Your bleeds may come at different times, or be different from what you are used to. Other possible side effects include headaches, sore breasts and weight gain. If the changes bother you, a doctor or nurse can talk through your options. Logging your bleeding in Ciclo can help you see the pattern and describe it clearly at an appointment.",
        },
        {
          heading: "Removal and your fertility",
          body: "A doctor or nurse can take the implant out when you want to stop using it or when it needs replacing. Once it is removed, your chance of getting pregnant goes straight back to what it was before it was fitted. The implant does not protect against sexually transmitted infections (STIs), so condoms are still worth using if STIs are a concern.",
        },
        {
          heading: "When to talk to a doctor or nurse",
          body: "Talk to a doctor or nurse if side effects or bleeding changes bother you, or if your implant is close to its replacement date. Bleeding after sex should always be checked. Without regular bleeds, it can be harder to notice a pregnancy. If you have possible signs such as feeling sick, sore breasts or unusual tiredness, take a pregnancy test or talk to a doctor or nurse.",
        },
      ],
      notice: "This is general information. A doctor or nurse can tell you whether the implant suits you and when yours needs replacing.",
    },
  },
  {
    slug: "patch-ring-injection",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — What is the contraceptive patch?", href: "https://www.nhs.uk/contraception/methods-of-contraception/contraceptive-patch/what-is-it/" },
      { label: "NHS — What is the contraceptive injection?", href: "https://www.nhs.uk/contraception/methods-of-contraception/contraceptive-injection/what-is-it/" },
      { label: "Office on Women's Health — Birth control methods", href: "https://www.womenshealth.gov/a-z-topics/birth-control-methods" },
      { label: "NHS — How well contraception works at preventing pregnancy", href: "https://www.nhs.uk/contraception/choosing-contraception/how-well-it-works-at-preventing-pregnancy/" },
      { label: "NHS — Blood clots", href: "https://www.nhs.uk/conditions/blood-clots/" },
      { label: "CDC — Combined hormonal contraceptives (US guidance for clinicians)", href: "https://www.cdc.gov/contraception/hcp/usspr/combined-hormonal-contraceptives.html" },
    ],
    related: ["periods-on-birth-control", "delaying-a-period", "choosing-contraception"],
    en: {
      title: "Patch, ring and injection",
      summary: "The patch, the vaginal ring and the injection are hormonal methods you do not need to think about every day. Here is how each works, how often you use it and what to expect.",
      sections: [
        {
          heading: "The patch",
          body: "The contraceptive patch is a small square, about 5 cm by 5 cm, that you stick on your skin. It releases two hormones, oestrogen and progestogen, into your blood. These stop the ovaries from releasing an egg. You wear each patch for 7 days and then replace it. In the usual pattern, you use a patch for 3 weeks, then have a week with no patch. Possible side effects include skin irritation, an upset stomach and changes to your bleeding.",
        },
        {
          heading: "The vaginal ring",
          body: "The vaginal ring is a small ring that you put into your vagina yourself. Like the patch, it releases oestrogen and progestogen, which stop the ovaries from releasing an egg. In the usual pattern, you leave it in for 3 weeks, take it out for 1 week, then put in a new ring. Possible side effects include headaches, an upset stomach, sore breasts and irritation in the vagina.",
        },
        {
          heading: "The injection",
          body: "The contraceptive injection contains only one hormone, progestogen. One injection lasts 8 to 13 weeks, depending on the type, so you need a new one every 2 to 3 months. It works by stopping ovulation. Possible side effects include bleeding between periods, missed periods, weight gain and mood changes. Long-term use can cause some loss of bone. After you stop, it can take up to 1 year for your fertility to return, so it may not suit you if you want to get pregnant soon.",
        },
        {
          heading: "How well they work",
          body: "Used perfectly, the patch, the ring and the injection are all over 99% effective. With typical use, the patch and ring are about 91% effective, which means around 9 in 100 users get pregnant in a year. The injection is about 94% effective with typical use. Mistakes, such as changing a patch or ring late or having an injection late, make them less effective. If you are late changing a patch or ring, check the leaflet or ask a pharmacist, as you may need condoms for 7 days. None of these methods protects against sexually transmitted infections (STIs).",
        },
        {
          heading: "Who may need another method",
          body: "These methods are not suitable for everyone. Like the combined pill, the patch and ring carry a small risk of serious problems such as blood clots, stroke and heart attack. Smoking raises the risk of blood clots. If you smoke and are 35 or over, the patch and ring, which contain oestrogen, may not be safe for you. The patch may also work less well if you weigh about 90 kg or more. A doctor or nurse can check which method is safe for you, including methods without oestrogen.",
        },
        {
          heading: "Warning signs of a blood clot",
          body: "Blood clots are rare, but it helps to know the signs, especially with the patch or ring. Get help urgently if one leg becomes painful or swollen, often in the calf or thigh, or the skin there looks red or darker. Call your local emergency number if you also feel short of breath or have chest pain. Tell the doctor which method you use.",
        },
      ],
      notice: "This is general information. A doctor or nurse can help you decide whether the patch, ring or injection is safe and suitable for you.",
    },
  },
  {
    slug: "condoms",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Condoms", href: "https://www.nhs.uk/contraception/methods-of-contraception/condoms/" },
      { label: "NHS — How well contraception works at preventing pregnancy", href: "https://www.nhs.uk/contraception/choosing-contraception/how-well-it-works-at-preventing-pregnancy/" },
      { label: "Office on Women's Health — Birth control methods", href: "https://www.womenshealth.gov/a-z-topics/birth-control-methods" },
      { label: "CDC — Contraception and birth control methods", href: "https://www.cdc.gov/contraception/about/index.html" },
      { label: "NHS — HIV prevention", href: "https://www.nhs.uk/conditions/hiv-and-aids/prevention/" },
    ],
    related: ["stis", "safer-sex", "emergency-contraception"],
    en: {
      title: "Condoms",
      summary: "Condoms are the only contraception that also lowers the risk of STIs, including HIV. They work well when used correctly every time. Here is how to get it right.",
      sections: [
        {
          heading: "Pregnancy and STI protection",
          body: "Condoms stop sperm from reaching an egg. External condoms, sometimes called male condoms, are worn on the penis. Internal condoms, sometimes called female condoms, are worn inside the vagina. Condoms are the only type of contraception that also lowers the risk of sexually transmitted infections (STIs), including HIV. For the best protection, use a condom every time you have sex. Other methods, such as the pill or an IUD, do not protect against STIs.",
        },
        {
          heading: "How well they work",
          body: "External condoms are up to 98% effective when used correctly every time. In real life, a condom can be put on too late, split or slip off, and typical use is about 82% effective. That means around 1 in 5 people who rely on condoms for a year get pregnant. Internal condoms are about 95% effective with perfect use and about 79% with typical use. Using them carefully every time makes a real difference.",
        },
        {
          heading: "How to use a condom",
          body: "Check the expiry date, because an out-of-date condom may not work, and look for a recognised safety mark on the packet. Put the condom on before any contact between the penis and the vagina or anus. Squeeze the tip to push out any air, then roll the condom all the way down to the base of the penis. After sex, hold the base of the condom as you pull out so it does not slip off. Use a new condom every time you have sex.",
        },
        {
          heading: "Lubricant and latex",
          body: "Many condoms are made of latex, but latex-free condoms are also available. They can help if you or your partner get irritation or an allergic reaction. Oil-based lubricant can make latex condoms break, so use a water-based or silicone-based lubricant instead.",
        },
        {
          heading: "If a condom splits or comes off",
          body: "If a condom splits or comes off during sex, you may need emergency contraception to prevent pregnancy. Act quickly: it needs to be used within 3 to 5 days, depending on the type, and it works better the sooner you use it. You may also want an STI test. A doctor, nurse or sexual-health clinic can help with both, and a pharmacist can advise on emergency contraceptive pills.",
        },
      ],
      notice: "This is general information. For advice on contraception or STI testing, talk to a doctor, nurse, pharmacist or sexual-health clinic.",
    },
  },
  {
    slug: "emergency-contraception",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Emergency contraception", href: "https://www.nhs.uk/contraception/emergency-contraception/" },
      { label: "WHO — Emergency contraception", href: "https://www.who.int/news-room/fact-sheets/detail/emergency-contraception" },
      { label: "NHS — What is an IUD?", href: "https://www.nhs.uk/contraception/methods-of-contraception/iud-coil/what-is-it/" },
      { label: "Office on Women's Health — Birth control methods", href: "https://www.womenshealth.gov/a-z-topics/birth-control-methods" },
      { label: "NHS — Side effects and risks of the emergency contraceptive pill", href: "https://www.nhs.uk/contraception/methods-of-contraception/emergency-contraceptive-pill-morning-after-pill/side-effects/" },
      { label: "NHS — Doing a pregnancy test", href: "https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/" },
    ],
    related: ["iud", "pregnancy-tests", "condoms"],
    en: {
      title: "Emergency contraception",
      summary: "Emergency contraception can prevent pregnancy after sex without contraception or when a method fails. Act as soon as you can: it works better the sooner you use it.",
      sections: [
        {
          heading: "When it can help",
          body: "Emergency contraception is a way to prevent pregnancy after sex. You might need it if you had sex without contraception, if a condom split or slipped off, if you used your usual method incorrectly, or after sexual assault. The emergency pill works by stopping or delaying the release of an egg. It does not cause an abortion, and it cannot end or harm a pregnancy that has already started.",
        },
        {
          heading: "Your options and time limits",
          body: "There are two types: a copper IUD (coil) and the emergency contraceptive pill, sometimes called the morning after pill. A doctor or nurse can fit a copper IUD within 5 days (120 hours) after sex. There are two kinds of emergency pill. Levonorgestrel needs to be taken within 3 days (72 hours) after sex. Ulipristal acetate needs to be taken within 5 days (120 hours). Whichever you use, the sooner the better.",
        },
        {
          heading: "Which works best",
          body: "The copper IUD is the most effective type of emergency contraception. It prevents more than 99% of pregnancies. Emergency pills also work well, but in studies about 1 to 2 in 100 people who took one still got pregnant. Ulipristal acetate can still be used between 3 and 5 days after sex, when levonorgestrel is no longer an option. A doctor, nurse or pharmacist can help you decide which is best for you. If you use hormonal contraception, such as the pill, tell them, because it can affect which emergency pill works best.",
        },
        {
          heading: "What to expect after the pill",
          body: "Emergency pills are safe for almost everyone. There are no age limits, and no health condition rules them out completely. Side effects can include feeling or being sick, headache, period-like cramps, light irregular bleeding and tiredness. If you are sick within 2 hours of taking an emergency pill, you may need another dose, so speak to a pharmacist straight away.",
        },
        {
          heading: "Getting it and what comes next",
          body: "Depending on where you live, you can get emergency pills from a pharmacy, a doctor or nurse, or a sexual-health clinic. A copper IUD needs to be fitted by a doctor or nurse, and it can stay in as ongoing contraception for years. Emergency contraception is not meant to be your regular method, so it is worth asking about longer-term options. It does not protect against sexually transmitted infections (STIs), so you may also want an STI test.",
        },
        {
          heading: "Afterwards",
          body: "Take a pregnancy test if your next period is late. If you are not sure when it is due, take one at least 3 weeks (21 days) after the sex. If you might be pregnant, even without a positive test, contact a doctor or nurse the same day if you have pain low down on one side of your tummy or any bleeding. Get emergency help for sudden, severe tummy pain, pain in the tip of your shoulder, heavy bleeding, or feeling very dizzy or faint. These can be signs of a pregnancy growing outside the womb (ectopic pregnancy). After sexual assault, a sexual-health clinic can also offer care and support.",
        },
      ],
      notice: "This is general information. Emergency contraception works best the sooner you use it, so contact a pharmacist, doctor, nurse or sexual-health clinic straight away.",
    },
  },
  {
    slug: "periods-on-birth-control",
    category: "contraception",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Mayo Clinic — Delaying your period with hormonal birth control", href: "https://www.mayoclinic.org/tests-procedures/combination-birth-control-pills/in-depth/womens-health/art-20044044" },
      { label: "NHS — Side effects and risks of the combined pill", href: "https://www.nhs.uk/contraception/methods-of-contraception/combined-pill/side-effects/" },
      { label: "Office on Women's Health — Birth control methods", href: "https://www.womenshealth.gov/a-z-topics/birth-control-methods" },
      { label: "NHS — Vaginal bleeding between periods or after sex", href: "https://www.nhs.uk/symptoms/vaginal-bleeding-between-periods-or-after-sex/" },
    ],
    related: ["delaying-a-period", "the-pill", "spotting"],
    en: {
      title: "Periods on hormonal contraception",
      summary: "Hormonal contraception often changes your bleeding. It may get lighter, become irregular or stop. Here is why, what to expect, and when a change is worth checking.",
      sections: [
        {
          heading: "Why bleeding changes",
          body: "Hormonal contraception changes the hormones that control your cycle, so your bleeding usually changes too. Many hormonal methods make bleeding lighter and shorter, and they can help with heavy or painful periods. The hormonal IUD can make bleeding lighter, irregular or stop altogether. The injection can cause bleeding between periods or missed periods, and the implant can cause irregular bleeding. The copper IUD contains no hormones, but it can make periods heavier.",
        },
        {
          heading: "Bleeds on the combined pill",
          body: "With a standard pack of combined pills, you take pills containing hormones for 3 weeks, then have a week without active hormones. The bleeding in that week is called a withdrawal bleed. It is your body's response to the drop in hormones, and it is not the same as a natural period. The patch and ring usually follow a similar pattern, with a bleed in the week off.",
        },
        {
          heading: "Spotting and breakthrough bleeding",
          body: "Light bleeding or spotting at other times, called breakthrough bleeding, is common in the first few months of the combined pill. It can also happen with the progestogen-only pill, and it is common when hormonal methods are used without a break to skip bleeds. It usually lessens over time as your body adjusts. If spotting still bothers you after about 3 months, talk to a doctor, nurse or pharmacist.",
        },
        {
          heading: "When bleeds stop",
          body: "Having no bleeds on hormonal contraception is not harmful. Your body does not need these bleeds to stay healthy. If a method is safe for you, using it to have fewer bleeds is usually safe as well, but check with a doctor or nurse first. One thing to know: without regular bleeds, it can be harder to notice a pregnancy. If you have signs such as feeling sick, sore breasts or unusual tiredness, take a pregnancy test.",
        },
        {
          heading: "When to get checked",
          body: "Logging bleeding and spotting in Ciclo can show whether a new pattern is settling. See a doctor, nurse or sexual-health clinic if you bleed after sex, if bleeding becomes heavy, or if a settled pattern changes for no clear reason. New bleeding can sometimes be caused by an infection such as chlamydia. Get emergency help if you have severe pain low in your tummy, especially on one side, and you could be pregnant, or very heavy bleeding with dizziness or fainting.",
        },
      ],
      notice: "This is general information. If your bleeding changes in a way that worries you, talk to a doctor, nurse or pharmacist.",
    },
  },
];
