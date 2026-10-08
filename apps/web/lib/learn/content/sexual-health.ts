// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const SEXUAL_HEALTH_ARTICLES: LearnArticle[] = [
  {
    slug: "stis",
    category: "sexual-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "WHO — Sexually transmitted infections (STIs)", href: "https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)" },
      { label: "NHS — Sexually transmitted infections (STIs)", href: "https://www.nhs.uk/conditions/sexually-transmitted-infections/" },
      { label: "CDC — About sexually transmitted infections (STIs)", href: "https://www.cdc.gov/sti/about/index.html" },
      { label: "NHS — HIV prevention", href: "https://www.nhs.uk/conditions/hiv-and-aids/prevention/" },
    ],
    related: ["safer-sex", "hpv", "pid"],
    en: {
      title: "Sexually transmitted infections (STIs)",
      summary: "STIs are very common and often cause no symptoms. Testing is quick and routine, and every STI can be treated, with many cured completely.",
      sections: [
        {
          heading: "What STIs are",
          body: "Sexually transmitted infections (STIs) are infections that pass from one person to another through sexual contact, including vaginal, anal and oral sex. They can be caused by bacteria, viruses or parasites. STIs are very common. Worldwide, more than 1 million curable STIs are passed on every day among people aged 15 to 49. Some STIs can also pass from a mother to her baby during pregnancy, birth or breastfeeding.",
        },
        {
          heading: "The most common STIs",
          body: "Four common STIs can usually be cured with antibiotics: chlamydia, gonorrhoea, syphilis and trichomoniasis. Four others are caused by viruses: herpes, HIV, hepatitis B and human papillomavirus (HPV). These cannot be cured, but medicines can help control herpes and HIV, and most HPV infections clear by themselves. Vaccines can protect against HPV and hepatitis B.",
        },
        {
          heading: "Signs to look out for",
          body: "Many STIs cause no symptoms, so you can have one without knowing and pass it on. When there are signs, they can include unusual discharge from the vagina or anus, pain when you pee, itching around the genitals or anus, a rash, and unusual bleeding from the vagina. Lumps, warts, blisters or sores around the genitals or anus can also be signs. Some STIs cause pain in the lower tummy.",
        },
        {
          heading: "Getting tested",
          body: "Testing is the only way to know for sure. Get tested if you have symptoms, a new partner, or a partner with symptoms. STI testing is a routine part of health care. In many places you can go to a sexual health clinic without a referral, and some clinics offer home testing kits. Tests usually involve a pee sample, a swab or a blood test. Some STIs can take up to 7 weeks after sex to show up on a test.",
        },
        {
          heading: "Treatment and telling partners",
          body: "If a test shows an STI, you will be offered treatment. Many STIs are treated with antibiotics. Take all of the treatment you are given. Your current partners, and recent ex-partners, should be told so they can get tested and treated too. If you would rather not tell them yourself, the clinic can often do this for you without giving your name. Using condoms correctly every time you have sex is one of the best ways to lower your risk.",
        },
        {
          heading: "Why it matters and when to act fast",
          body: "Untreated STIs can cause lasting problems. Chlamydia and gonorrhoea are major causes of pelvic inflammatory disease (PID) and infertility. Herpes, gonorrhoea and syphilis can raise the chance of getting HIV, and HPV can cause cervical and other cancers. Get urgent medical help if you have severe pain in your lower tummy with a high temperature, being sick or feeling very unwell. This can be a sign of PID. If you think you have been exposed to HIV, go to a sexual health clinic or emergency department straight away. Medicine called PEP can lower the chance of infection, but it must be started within 72 hours.",
        },
      ],
      notice: "This is general information, not a diagnosis. If you have symptoms or think you may have an STI, get tested at a sexual health clinic or by a doctor or nurse.",
    },
  },
  {
    slug: "safer-sex",
    category: "sexual-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Planned Parenthood — Safer sex", href: "https://www.plannedparenthood.org/learn/stds-hiv-safer-sex/safer-sex" },
      { label: "WHO — Sexually transmitted infections (STIs)", href: "https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)" },
      { label: "NHS — Sexually transmitted infections (STIs)", href: "https://www.nhs.uk/conditions/sexually-transmitted-infections/" },
      { label: "NHS — HIV prevention", href: "https://www.nhs.uk/conditions/hiv-and-aids/prevention/" },
      { label: "NHS — Emergency contraception", href: "https://www.nhs.uk/contraception/emergency-contraception/" },
    ],
    related: ["condoms", "stis", "choosing-contraception"],
    en: {
      title: "Safer sex",
      summary: "Safer sex means lowering the chance of STIs and of pregnancy you do not want. Condoms, regular testing, vaccines and honest talk with partners all help.",
      sections: [
        {
          heading: "What safer sex means",
          body: "Safer sex means taking steps to protect yourself and your partners from sexually transmitted infections (STIs), and from pregnancy if you do not want one. No single step removes every risk, but using a few together lowers it a lot. What suits you will depend on you, your partners and the kinds of sex you have.",
        },
        {
          heading: "Lower and higher risk sex",
          body: "Some kinds of sex carry very little risk. These include masturbation, rubbing against each other with clothes on, and touching a partner's genitals with your hands. This is low risk as long as their body fluids do not get into your mouth or genitals. Kissing, oral sex and sharing sex toys carry some risk. Vaginal or anal sex without a condom carries the most risk.",
        },
        {
          heading: "Condoms and other barriers",
          body: "Used correctly every time, condoms are one of the most effective ways to protect against STIs, including HIV. They are also the only type of contraception that protects against both pregnancy and STIs. You can use condoms, internal condoms, dental dams or gloves for oral, anal and vaginal sex. Using lubricant with a condom also makes sex safer, especially anal sex. With latex condoms, use a water-based or silicone-based lubricant, because oil-based products can make condoms break.",
        },
        {
          heading: "Testing and vaccines",
          body: "Regular STI testing is part of safer sex, even if you always use condoms and feel well, because many STIs have no symptoms. In many places you can go to a sexual health clinic without a referral, and some clinics offer home testing kits. Vaccines can protect you against two STIs, human papillomavirus (HPV) and hepatitis B. Ask a doctor or nurse whether you are up to date. If you have a higher chance of getting HIV, ask a sexual health clinic about PrEP, a medicine that lowers that chance.",
        },
        {
          heading: "Talking with partners",
          body: "It can help to talk about safer sex before you have sex. You might talk about when you were each last tested, which contraception you use, and using condoms. If you know you have an STI, tell a partner before you have sex. Alcohol and drugs can make it harder to stick to the choices you want, so it helps to agree on things while you are sober.",
        },
        {
          heading: "If something goes wrong",
          body: "If pregnancy is possible, you may choose to use condoms together with another kind of contraception. A doctor, nurse or sexual health clinic can help you choose. If a condom splits or slips off, or you had sex without protection, act quickly. Emergency contraception works best the sooner you use it and must be used within 3 to 5 days. If HIV is a risk, ask a sexual health clinic or emergency department about PEP, a medicine that must be started within 72 hours. Ask about STI testing too. Some STIs take up to 7 weeks to show on a test, so they may suggest testing again later.",
        },
      ],
      notice: "This is general information. For advice on testing or contraception that suits you, talk to a doctor, nurse or sexual health clinic.",
    },
  },
  {
    slug: "hpv",
    category: "sexual-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "CDC — About HPV", href: "https://www.cdc.gov/hpv/about/index.html" },
      { label: "WHO — Human papillomavirus and cancer", href: "https://www.who.int/news-room/fact-sheets/detail/human-papilloma-virus-and-cancer" },
      { label: "WHO — Sexually transmitted infections (STIs)", href: "https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)" },
      { label: "NHS — Sexually transmitted infections (STIs)", href: "https://www.nhs.uk/conditions/sexually-transmitted-infections/" },
      { label: "MedlinePlus — HPV", href: "https://medlineplus.gov/hpv.html" },
    ],
    related: ["cervical-screening", "stis", "gynecologic-cancers"],
    en: {
      title: "HPV and the HPV vaccine",
      summary: "HPV is a very common virus passed on through sex. Most infections clear by themselves, but some can lead to cancer. The vaccine and cervical screening help protect you from cervical cancer.",
      sections: [
        {
          heading: "What HPV is",
          body: "Human papillomavirus (HPV) is a very common virus. It spreads through close skin-to-skin contact during vaginal, anal or oral sex. Nearly everyone who is sexually active will get HPV at some point, usually without knowing. A person can pass it on even when they have no signs or symptoms. Having HPV does not mean that you or a partner did anything wrong. Some types of HPV cause warts on or around the genitals or anus. Other, high-risk types can lead to cancer.",
        },
        {
          heading: "Most infections go away",
          body: "HPV usually causes no symptoms. About 9 in 10 HPV infections clear by themselves within 2 years, without causing any harm. So having HPV does not mean you will get cancer. Not smoking, or stopping smoking, lowers the chance that an infection will stay in the body for a long time.",
        },
        {
          heading: "How HPV can lead to cancer",
          body: "Sometimes an infection with a high-risk type of HPV does not clear and stays for years. A long-lasting infection like this is the cause of cervical cancer. It is also linked to cancers of the vulva, vagina, anus, penis and the back of the throat. Cervical cancer usually takes 15 to 20 years to develop after an HPV infection. This long gap is why regular cervical screening can find changes early, before they become cancer.",
        },
        {
          heading: "The HPV vaccine",
          body: "Safe and highly effective vaccines protect against HPV. The vaccine works best when given before a person is ever exposed to the virus. This is why it is offered to young people, often between the ages of 9 and 14, before they start having sex. If you missed it or are not sure whether you had it, ask a doctor or nurse whether it is worth having now.",
        },
        {
          heading: "Screening and condoms",
          body: "Keep going to cervical screening when you are invited. The ages and how often you are invited vary between countries. Condoms lower the chance of passing on HPV, but they do not protect fully, because they do not cover all the skin around the genitals. Using condoms still protects against many other sexually transmitted infections (STIs).",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if you notice lumps, warts or sores around your genitals or anus. Bleeding between periods, after sex or after menopause should always be checked. These signs often have other causes, but it is important to get them looked at.",
        },
      ],
      notice: "This is general information. Ask a doctor or nurse about the HPV vaccine and when you are due for cervical screening.",
    },
  },
  {
    slug: "libido",
    category: "sexual-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Low sex drive (loss of libido)", href: "https://www.nhs.uk/conditions/loss-of-libido/" },
      { label: "Better Health Channel — Libido", href: "https://www.betterhealth.vic.gov.au/health/healthyliving/libido" },
      { label: "NHS — Periods", href: "https://www.nhs.uk/conditions/periods/" },
    ],
    related: ["mood-and-cycle", "stress-and-cycle", "painful-sex"],
    en: {
      title: "Sex drive and your cycle",
      summary: "Sex drive varies a lot between people and over time. Hormones, health, stress and relationships all play a part, and low desire is only a problem if it bothers you.",
      sections: [
        {
          heading: "There is no normal level",
          body: "Sex drive (libido) means how much you want sex. People differ a lot in how often they want sex. Some want it every day and some rarely or never. No amount is the correct one. Desire also works in different ways. For some people it appears without much prompting. For others it grows in response to the right moment or situation. Both are normal.",
        },
        {
          heading: "Changes across your cycle",
          body: "Hormone levels rise and fall through each menstrual cycle. Some people notice their interest in sex changes too. For example, a lower sex drive can be one of the signs of premenstrual syndrome (PMS) in the days before a period. Other people notice no pattern at all. Because people differ so much, the most useful guide is your own experience. Logging sex drive in Ciclo for a few cycles can show whether you have a pattern of your own.",
        },
        {
          heading: "Contraception, pregnancy and menopause",
          body: "Some people feel less interested in sex while using hormonal contraception, such as the pill, patch or implant, although studies have not shown that the combined pill changes sex drive. Pregnancy, giving birth and breastfeeding all change hormone levels and can affect desire. Hormone levels also fall as you get older, especially around menopause, and this can lower desire. Vaginal dryness, which can make sex less comfortable, can also reduce interest.",
        },
        {
          heading: "Stress, health and relationships",
          body: "Many other things affect desire. Stress, anxiety and depression can all lower it, and depression can also bring tiredness and a loss of interest in things you usually enjoy. Some medicines, including some antidepressants and blood pressure medicines, can reduce sex drive, and so can drinking too much alcohol. Long-term conditions such as diabetes, heart disease or an underactive thyroid can play a part. Problems in a relationship often affect your sex life too.",
        },
        {
          heading: "When low desire is a problem",
          body: "A lower sex drive is only a problem if it bothers you or causes difficulties with a partner. If it does, it can help to think about what has changed recently, such as a new medicine or contraception, a new baby, or a stressful time. Talking openly with a partner about what you each want can also help.",
        },
        {
          heading: "Getting help",
          body: "See a doctor or nurse if you are worried about your sex drive, if you think a medicine or your contraception is affecting it, or if it has not returned after pregnancy. Help depends on the cause. It might mean changing a medicine or type of contraception, treatment for depression or menopause symptoms, lubricant for dryness, relationship counselling, or seeing a sex therapist.",
        },
      ],
      notice: "This is general information. If changes in your sex drive worry you, talk to a doctor or nurse.",
    },
  },
  {
    slug: "painful-sex",
    category: "sexual-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Vaginismus", href: "https://www.nhs.uk/conditions/vaginismus/" },
      { label: "NHS — Thrush in men and women", href: "https://www.nhs.uk/conditions/thrush-in-men-and-women/" },
      { label: "NHS — Vaginal dryness", href: "https://www.nhs.uk/conditions/vaginal-dryness/" },
      { label: "Mayo Clinic — Painful intercourse (dyspareunia)", href: "https://www.mayoclinic.org/diseases-conditions/painful-intercourse/symptoms-causes/syc-20375967" },
    ],
    related: ["endometriosis", "pelvic-floor", "menopause-symptoms"],
    en: {
      title: "Pain during sex",
      summary: "Pain during sex has many possible causes, from dryness and infections to vaginismus or endometriosis. You do not have to put up with it, and help is available.",
      sections: [
        {
          heading: "Sex should not hurt",
          body: "Sex is not supposed to be painful. If it hurts, it is a sign that something needs attention, and there is no need to keep going or to feel embarrassed. You can stop at any time. Noting when the pain happens, and where you feel it, can help a doctor or nurse find the cause. Ciclo's notes are one place to keep this.",
        },
        {
          heading: "Common causes",
          body: "Pain during sex has many possible causes. Vaginal dryness is a common one. It is more likely around and after menopause, during pregnancy or breastfeeding, with some medicines such as hormonal contraception or antidepressants, or when you are not fully aroused. Infections such as thrush and some sexually transmitted infections (STIs) can cause soreness or stinging. A reaction to condoms or soap can irritate the skin. Pain felt deep inside can come from conditions such as endometriosis, pelvic inflammatory disease (PID) or fibroids. Stress and worry can also make the pelvic floor muscles tighten.",
        },
        {
          heading: "Vaginismus",
          body: "Vaginismus is when the muscles around the vagina tighten on their own when something is about to go in, such as a penis, finger or tampon, or during cervical screening. This can cause burning or stinging pain. It is not something you do on purpose. The cause is not always clear. It is linked to fear or worry about sex, a past painful experience, sexual assault or abuse, a difficult birth or examination, or a painful condition like thrush.",
        },
        {
          heading: "Treatments that help",
          body: "Treatment depends on the cause. Thrush and STIs can be treated with medicine. A water-based lubricant before sex, or a vaginal moisturiser used regularly, can help with dryness. If dryness is linked to menopause, a doctor may offer oestrogen treatment. Vaginismus is usually treated by working on feelings about penetration and slowly getting used to it. This can include talking therapy for sex-related worries (psychosexual therapy), relaxation, pelvic floor exercises, and vaginal trainers, a set of smooth shapes from small to larger that you use at your own pace.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor, nurse or sexual health clinic if sex is often painful or the pain keeps coming back, if you think you have vaginismus, or if you have unusual discharge, sores or itching. They will ask some questions and may take a quick look to rule out an infection. Bleeding after sex should always be checked. Get urgent medical help if you have sudden, severe pain in your lower tummy, especially if you could be pregnant, or tummy pain with a high temperature, being sick or feeling very unwell.",
        },
      ],
      notice: "This is general information, not a diagnosis. If sex is painful, talk to a doctor, nurse or sexual health clinic.",
    },
  },
  {
    slug: "consent-relationships",
    category: "sexual-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Planned Parenthood — Sexual consent", href: "https://www.plannedparenthood.org/learn/relationships/sexual-consent" },
      { label: "Office on Women's Health — Am I being abused?", href: "https://www.womenshealth.gov/relationships-and-safety/signs-abuse" },
      { label: "Office on Women's Health — Relationships and safety", href: "https://www.womenshealth.gov/relationships-and-safety" },
      { label: "NHS — Emergency contraception", href: "https://www.nhs.uk/contraception/emergency-contraception/" },
      { label: "NHS — HIV prevention", href: "https://www.nhs.uk/conditions/hiv-and-aids/prevention/" },
    ],
    related: ["safer-sex", "emergency-contraception", "stis"],
    en: {
      title: "Consent and healthy relationships",
      summary: "Consent means freely and clearly agreeing to sexual activity, every time. Here is what real consent looks like, and the signs of a healthy or unhealthy relationship.",
      sections: [
        {
          heading: "What consent means",
          body: "Consent is a clear, active yes to sexual activity. It is how each person shows the other that they want what is happening. Both people need to give it, every time, for every kind of sexual activity. This is true with a new partner and with a long-term partner. Sexual activity without consent is sexual assault or rape.",
        },
        {
          heading: "What makes consent real",
          body: "Real consent is given freely, without pressure or manipulation, and not under the influence of drugs or alcohol. It is informed: if someone says they will use a condom and then does not, there is no full consent. It is enthusiastic, meaning you only do what you want to do, not what you feel is expected. It is specific, so saying yes to one thing, like kissing, is not a yes to anything else.",
        },
        {
          heading: "You can always change your mind",
          body: "You can stop or say no at any point, even partway through and even if you have said yes before. Silence is not consent. What someone wears, where they go or what they have done in the past never counts as a yes. Someone who is very drunk, high, asleep or unconscious is not able to agree to sex.",
        },
        {
          heading: "Checking in with a partner",
          body: "The clearest way to know is to ask. Simple questions like 'Is this OK?' or 'Do you want to keep going?' work well. Pay attention to body language too. If a partner seems unsure, goes quiet, tenses up or pulls away, stop and check. A good partner will be glad you asked and will respect your answer.",
        },
        {
          heading: "Healthy and unhealthy relationships",
          body: "In a healthy relationship, you feel respected and safe. You can say no to sex, or to anything else, without fear of what will happen. You can see friends and family, make your own decisions, be yourself, and talk honestly when you disagree. Warning signs include a partner who pressures or forces you into sex, keeps track of everything you do or demands your passwords, controls your money or your contraception, keeps you from friends and family, puts you down, or threatens or hurts you. Often feeling pressured, controlled or scared around a partner is a warning sign too.",
        },
        {
          heading: "If you feel unsafe",
          body: "If a relationship feels unsafe, or someone did something sexual to you without your consent, it is not your fault. You do not have to deal with it alone. You can talk to a doctor or nurse, a sexual health clinic, or a local domestic abuse helpline. After sex without consent, try to get medical help as soon as you can. Emergency contraception must be used within 3 to 5 days and works best the sooner you take it. Medicine that lowers the chance of HIV (PEP) must be started within 72 hours. A doctor or clinic can also test you for STIs. If you are in danger right now, call your local emergency number.",
        },
      ],
      notice: "If you feel unsafe in a relationship, you deserve support. Talk to someone you trust, a doctor or a local helpline, or call emergency services if you are in danger.",
    },
  },
  {
    slug: "sex-during-period",
    category: "sexual-health",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Planned Parenthood — Can I have sex during my period?", href: "https://www.plannedparenthood.org/blog/can-i-have-sex-during-my-period-can-i-get-pregnant-during-my-period" },
      { label: "NHS — Periods and fertility in the menstrual cycle", href: "https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/" },
      { label: "KidsHealth — Could I get pregnant if I have sex during my period?", href: "https://kidshealth.org/en/teens/sex-during-period.html" },
      { label: "NHS — Emergency contraception", href: "https://www.nhs.uk/contraception/emergency-contraception/" },
    ],
    related: ["fertile-window", "condoms", "emergency-contraception"],
    en: {
      title: "Sex during your period",
      summary: "Sex during your period is fine if you both want it. You can still get pregnant or get an STI, so contraception and condoms still matter.",
      sections: [
        {
          heading: "It is your choice",
          body: "Having sex during your period is not harmful, and whether you do is up to you and your partner. Some people enjoy it and some prefer not to, and both are fine. Some find that having an orgasm helps ease period cramps. If you would rather wait, other kinds of closeness and touch are always an option.",
        },
        {
          heading: "You can still get pregnant",
          body: "Pregnancy is less likely during a period, but it can happen. Sperm can survive inside the body for up to 7 days after sex. Ovulation (when an ovary releases an egg) usually happens about 10 to 16 days before your next period. If you have a short cycle, or you ovulate earlier than usual, ovulation can happen soon after your period ends. Sperm from sex during your period could still be alive then. Also, light bleeding is not always a period. Some people bleed a little around ovulation, which is when pregnancy is most likely.",
        },
        {
          heading: "Contraception and STIs still matter",
          body: "Whatever day of your period it is, sex can still lead to pregnancy or a sexually transmitted infection (STI). Some STIs may also pass between partners more easily during a period. Keep using contraception if you do not want to get pregnant. Condoms are the only kind of contraception that also protects against STIs, so use one every time if STIs are a concern. Ciclo's fertile window is only an estimate, so do not rely on it to prevent pregnancy.",
        },
        {
          heading: "Practical tips",
          body: "A dark towel on the bed can make cleaning up easier, and some people prefer having sex in the shower. Take out a tampon before penetrative sex. If you have cramps or feel tired, slower or gentler sex, or other kinds of touch, may feel better. Talk with your partner about what feels comfortable for you both.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "Sex should not hurt. See a doctor or nurse if sex is painful, or if you bleed after sex when you are not on your period, as this should always be checked. If you had sex without contraception and do not want to be pregnant, ask a pharmacist, doctor or sexual health clinic about emergency contraception as soon as possible. It needs to be used within 3 to 5 days, and it works better the sooner you use it.",
        },
      ],
      notice: "This is general information. You can get pregnant or get an STI from sex during your period, so keep using contraception and condoms.",
    },
  },
];
