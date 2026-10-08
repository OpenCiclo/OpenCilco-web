// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import type { LearnArticle } from "@/lib/learn/articles";

export const MENOPAUSE_ARTICLES: LearnArticle[] = [
  {
    slug: "perimenopause",
    category: "menopause",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Menopause basics", href: "https://www.womenshealth.gov/menopause/menopause-basics" },
      { label: "NHS — Early or premature menopause", href: "https://www.nhs.uk/conditions/early-menopause/" },
      { label: "NHS — What are menopause and perimenopause", href: "https://www.nhs.uk/conditions/menopause-and-perimenopause/what-are-menopause-and-perimenopause/" },
      { label: "NHS — About hormone replacement therapy (HRT)", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/about-hormone-replacement-therapy-hrt/" },
    ],
    related: ["menopause-symptoms", "early-menopause", "heavy-periods"],
    en: {
      title: "Perimenopause",
      summary: "Perimenopause is the time leading up to your last period, when hormone levels change and periods become less predictable. It often starts in your 40s and lasts a few years.",
      sections: [
        {
          heading: "What perimenopause is",
          body: "Perimenopause, also called the menopausal transition, is the time leading up to your last period. Your ovaries make less of the hormones oestrogen and progesterone, so your periods change and in the end stop. Menopause is when your periods stop for good. It is confirmed once you have gone 12 months without a period. Most people reach menopause somewhere between their mid-40s and mid-50s, but it can happen earlier.",
        },
        {
          heading: "When it starts and how long it lasts",
          body: "Perimenopause usually starts in your mid- to late 40s. On average it lasts about 4 years before periods stop, but it can be anywhere from 2 to 8 years. The timing and the symptoms vary a lot from person to person, so your experience may be quite different from a friend's or a relative's.",
        },
        {
          heading: "Changes to your periods",
          body: "Your periods may come closer together or further apart, and you might skip a month or a few months. Bleeding may be heavier or lighter than before, and periods may last longer or be shorter than usual. Logging your periods and symptoms in Ciclo can help you see the pattern and describe it to a doctor, but its predictions are estimates and less reliable while your cycles are changing.",
        },
        {
          heading: "Other common symptoms",
          body: "As hormone levels change, many people notice other symptoms too. These include hot flushes and night sweats, trouble sleeping, low mood or anxiety, a lower sex drive, vaginal dryness, and problems with memory or concentration. If symptoms affect your daily life, there are treatments that can help.",
        },
        {
          heading: "You can still get pregnant",
          body: "Even if your periods are irregular or you skip a few months, you can still get pregnant during perimenopause. If you do not want to get pregnant, keep using contraception until you have had no periods for 2 years if you are under 50, or for 1 year if you are 50 or over. HRT does not prevent pregnancy. Hormonal contraception can hide your natural periods, so a doctor or nurse can tell you which method suits you at this stage of life and when it is safe to stop.",
        },
        {
          heading: "When to see a doctor or nurse",
          body: "See a doctor or nurse if your symptoms bother you, or if you think you have menopause symptoms before the age of 45. Also get checked if your periods become very heavy, for example if you need a new pad or tampon every 1 to 2 hours. Bleeding between periods or after sex should be checked too. So should any bleeding once you have gone a year without a period. Get urgent help if you have very heavy bleeding with dizziness or fainting.",
        },
      ],
      notice: "This is general information, not a diagnosis. If changes to your periods or symptoms worry you, talk to a doctor or nurse.",
    },
  },
  {
    slug: "menopause-symptoms",
    category: "menopause",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Menopause symptoms and relief", href: "https://www.womenshealth.gov/menopause/menopause-symptoms-and-relief" },
      { label: "NHS — Treatment for menopause and perimenopause", href: "https://www.nhs.uk/conditions/menopause-and-perimenopause/treatment/" },
      { label: "NHS — Benefits and risks of HRT", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/benefits-and-risks-of-hormone-replacement-therapy-hrt/" },
      { label: "Office on Women's Health — Menopause basics", href: "https://www.womenshealth.gov/menopause/menopause-basics" },
    ],
    related: ["hrt", "perimenopause", "postmenopausal-bleeding"],
    en: {
      title: "Menopause symptoms",
      summary: "Hot flushes, poor sleep, mood changes and vaginal dryness are common around menopause. Here is why they happen, what helps, and when to talk to a doctor or nurse.",
      sections: [
        {
          heading: "Why symptoms happen",
          body: "Around menopause, your ovaries make much less of the hormone oestrogen. Low oestrogen is behind many of the changes people notice, from hot flushes to vaginal dryness. Symptoms often start in perimenopause, before periods stop, and they vary a lot from person to person. Common ones include hot flushes and night sweats, trouble sleeping, low mood or anxiety, problems with memory or concentration, vaginal dryness, and a lower sex drive.",
        },
        {
          heading: "Hot flushes and night sweats",
          body: "Hot flushes are the most common symptom. During a hot flush, heat spreads suddenly over your upper body. They are most common in the year before and the year after your last period, but they can carry on for up to 14 years after menopause. Spicy food, alcohol, caffeine, stress and hot places can trigger them. Wearing layers you can take off, using a fan, and noting your own triggers can help.",
        },
        {
          heading: "Sleep",
          body: "Night sweats can wake you up, and some people need to get up several times a night to pee. Being active during the day helps many people sleep. A cool, dark, quiet room helps too. Try not to eat a big meal, smoke or drink alcohol late in the evening.",
        },
        {
          heading: "Mood, memory and focus",
          body: "You may feel irritable or tearful, and the risk of depression and anxiety is higher around menopause. Stress, family changes and tiredness can add to this. As many as two in three women in perimenopause notice problems with memory or concentration. If low mood or anxiety does not lift, talk to a doctor or nurse, because talking therapies and medicines can help. If you are thinking about harming yourself, get emergency help or contact a crisis line now.",
        },
        {
          heading: "Vaginal, bladder and sexual changes",
          body: "Low oestrogen can make the vagina drier and thinner. This can cause itching, burning or discomfort, and make sex painful. A vaginal moisturiser and a water-based lubricant can help, and a doctor can prescribe oestrogen that you use in the vagina. Some people leak urine when they cough, sneeze or laugh. Interest in sex may go down or up, and pain during sex can lower it.",
        },
        {
          heading: "Getting help",
          body: "If any symptom bothers you, talk to a doctor or nurse. Hormone replacement therapy (HRT) relieves most menopause symptoms. Other options include cognitive behavioural therapy (CBT) and some non-hormonal medicines. There is very little evidence on how well herbal remedies work or how safe they are. See a doctor or nurse as soon as possible if you have any bleeding or spotting after a year without periods.",
        },
      ],
      notice: "This is general information. If menopause symptoms affect your daily life, a doctor or nurse can talk you through treatment options.",
    },
  },
  {
    slug: "hrt",
    category: "menopause",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Benefits and risks of HRT", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/benefits-and-risks-of-hormone-replacement-therapy-hrt/" },
      { label: "NHS — Treatment for menopause and perimenopause", href: "https://www.nhs.uk/conditions/menopause-and-perimenopause/treatment/" },
      { label: "Office on Women's Health — Menopause symptoms and relief", href: "https://www.womenshealth.gov/menopause/menopause-symptoms-and-relief" },
      { label: "NHS — About hormone replacement therapy (HRT)", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/about-hormone-replacement-therapy-hrt/" },
      { label: "NHS — Side effects of HRT", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/side-effects-of-hormone-replacement-therapy-hrt/" },
      { label: "NHS — Blood clots", href: "https://www.nhs.uk/conditions/blood-clots/" },
    ],
    related: ["menopause-symptoms", "bone-health", "early-menopause"],
    en: {
      title: "HRT and other treatments",
      summary: "Hormone replacement therapy (HRT) relieves most menopause symptoms and helps protect your bones. Here is a balanced look at its benefits and risks, and at options without hormones.",
      sections: [
        {
          heading: "What HRT is",
          body: "Hormone replacement therapy (HRT) replaces hormones that your body makes less of around menopause. Oestrogen is the main hormone, and it can be taken as tablets or used as patches, a spray or a gel. If you still have a womb, you usually take oestrogen with progestogen (combined HRT). The progestogen can be taken as tablets, in a combined patch or through a hormonal coil (IUS). If your womb has been removed, oestrogen on its own is usually enough.",
        },
        {
          heading: "How HRT can help",
          body: "HRT relieves most symptoms of perimenopause and menopause. This includes hot flushes, night sweats, sleep problems, vaginal dryness, and anxiety and low mood caused by menopause. It also helps prevent osteoporosis, the condition that makes bones weak, and it can help your muscles stay strong. Some people are also offered testosterone gel or cream, which can help with low sex drive. For most people, the benefits of HRT outweigh the risks.",
        },
        {
          heading: "Risks to know about",
          body: "HRT can slightly increase the risk of breast cancer. With combined HRT, there are around 5 extra cases of breast cancer for every 1,000 women who take it for 5 years. Oestrogen-only HRT causes little or no increase. The risk goes up the longer you take HRT and the older you are, and it falls again after you stop. HRT tablets can raise the risk of blood clots and slightly raise the risk of stroke, but both risks are still very low. HRT patches, sprays and gels do not raise either risk. HRT has little or no effect on the risk of heart disease. For most people, serious side effects from HRT are rare.",
        },
        {
          heading: "Other options",
          body: "If you cannot take HRT or prefer not to, there are other options. Cognitive behavioural therapy (CBT), a type of talking therapy, can help with menopause symptoms. Some medicines also used for depression, epilepsy or high blood pressure may help with hot flushes. Clonidine is one example. For vaginal dryness, moisturisers and water-based lubricants can help, and oestrogen used as a vaginal cream or pessary is another option. There is very little evidence on how well herbal remedies work or how safe they are.",
        },
        {
          heading: "Making your decision",
          body: "Whether to take HRT is a personal choice. It depends on your symptoms, your health, and how you weigh up the benefits and risks. HRT may not suit you if you have had breast, ovarian or womb cancer or a blood clot, or if you have untreated high blood pressure or liver disease. HRT does not prevent pregnancy, so you may still need contraception for a while. Noting your symptoms in Ciclo for a few weeks before an appointment can help you describe what affects you most.",
        },
        {
          heading: "When to get help",
          body: "Irregular bleeding or spotting is common in the first months of HRT and usually settles within 6 months. See a doctor if it lasts longer than 6 months, gets heavier, or starts after your bleeding had stopped. Get help urgently if one leg becomes painful or swollen, often in the calf or thigh, or the skin there looks red or darker. Call your local emergency number if you also feel short of breath or have chest pain.",
        },
      ],
      notice: "This is general information. Decisions about HRT are personal and best made with a doctor or nurse who knows your health history.",
    },
  },
  {
    slug: "early-menopause",
    category: "menopause",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Early or premature menopause", href: "https://www.nhs.uk/conditions/early-menopause/" },
      { label: "NHS — Benefits and risks of HRT", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/benefits-and-risks-of-hormone-replacement-therapy-hrt/" },
      { label: "Office on Women's Health — Osteoporosis", href: "https://www.womenshealth.gov/a-z-topics/osteoporosis" },
      { label: "NICHD — Treatments for primary ovarian insufficiency (POI)", href: "https://www.nichd.nih.gov/health/topics/poi/conditioninfo/treatments" },
      { label: "NICHD — About primary ovarian insufficiency (POI)", href: "https://www.nichd.nih.gov/health/topics/poi/conditioninfo" },
    ],
    related: ["bone-health", "hrt", "age-and-fertility"],
    en: {
      title: "Early menopause and POI",
      summary: "Menopause before 45 is called early menopause, and before 40 it is called premature ovarian insufficiency (POI). Here is why it happens and why treatment matters for long-term health.",
      sections: [
        {
          heading: "What early menopause means",
          body: "Most people reach menopause between their mid-40s and mid-50s. Early menopause is when your periods stop before the age of 45. When this happens before 40, it is called premature ovarian insufficiency (POI). POI is not always the same as menopause. Periods can still come now and then, and the ovaries sometimes start working again for a while. The main sign is periods becoming irregular or stopping completely. You may also have hot flushes, night sweats and trouble sleeping, or changes in mood, sex drive, memory and concentration.",
        },
        {
          heading: "Why it can happen",
          body: "Often no cause is found. Known causes include cancer treatment such as radiotherapy or chemotherapy, surgery to remove the ovaries, certain hormone medicines, and some genetic and autoimmune conditions. Your chance is also higher if early menopause runs in your family, if you started your periods early, if you smoke, or if you are underweight.",
        },
        {
          heading: "Getting checked",
          body: "See a doctor if you are under 45 and think you have menopause symptoms, or if your periods become irregular or stop. A doctor will ask about your symptoms and may do blood tests. A record of your periods and symptoms, such as a Ciclo log, can help you explain what has changed. Periods can also stop for other reasons, including pregnancy, so it is worth finding out the cause.",
        },
        {
          heading: "Why it matters for bones and heart",
          body: "Oestrogen helps keep bones strong, and very low oestrogen is the most common reason women lose bone. When menopause comes early, you spend more years with low oestrogen. This means a higher chance of osteoporosis, where bones become weak and break easily, and of cardiovascular disease, which affects the heart and blood vessels. Replacing your hormones until the usual age of menopause helps protect your bones, heart and blood vessels.",
        },
        {
          heading: "Treatment",
          body: "The main treatments are hormone replacement therapy (HRT) or the combined contraceptive pill, which replace the hormones your ovaries are no longer making. As well as easing symptoms, HRT helps prevent osteoporosis. Doctors often suggest taking it until about age 50, the usual age of menopause. Weight-bearing activity, getting enough calcium and vitamin D, and not smoking also help look after your bones.",
        },
        {
          heading: "Fertility and support",
          body: "Early menopause can make it harder to get pregnant. With POI, pregnancy is still possible: between 5 and 10 in 100 people get pregnant without treatment. If you do not want to get pregnant, ask about contraception, because HRT does not prevent pregnancy. Some people are able to have children through IVF, using their own frozen eggs or donor eggs. Learning that menopause has come early can be hard, especially if you had hoped to have children or more children. A doctor, a counsellor or a support group can help with the emotional side as well as the physical one.",
        },
      ],
      notice: "This is general information, not a diagnosis. If your periods stop or become irregular before 45, talk to a doctor.",
    },
  },
  {
    slug: "bone-health",
    category: "menopause",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "Office on Women's Health — Osteoporosis", href: "https://www.womenshealth.gov/a-z-topics/osteoporosis" },
      { label: "NHS — Benefits and risks of HRT", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/benefits-and-risks-of-hormone-replacement-therapy-hrt/" },
      { label: "NHS — Early or premature menopause", href: "https://www.nhs.uk/conditions/early-menopause/" },
      { label: "NICHD — Treatments for primary ovarian insufficiency (POI)", href: "https://www.nichd.nih.gov/health/topics/poi/conditioninfo/treatments" },
    ],
    related: ["calcium-vitamin-d", "early-menopause", "hrt"],
    en: {
      title: "Bone health and osteoporosis",
      summary: "After menopause, lower oestrogen speeds up bone loss and raises the risk of osteoporosis. Here is why it happens and what you can do to protect your bones.",
      sections: [
        {
          heading: "Why bones weaken after menopause",
          body: "Osteoporosis is a condition that makes bones weak, so they break easily. Women usually have smaller, thinner bones than men. The most common reason for bone loss in women is very low levels of the hormone oestrogen, which is what happens after menopause. Some women lose up to a quarter of their bone mass in the first 10 years after menopause. In the United States, about 1 in 4 women aged 65 or over has osteoporosis.",
        },
        {
          heading: "A silent condition",
          body: "Osteoporosis usually causes no symptoms. You can lose bone for many years without knowing it, until a bone breaks. Breaks are most common in the hip, the wrist and the spine. Because there are no early warning signs, it helps to know your risk and to look after your bones before anything happens.",
        },
        {
          heading: "What raises your risk",
          body: "Being past menopause raises your risk, and an early menopause raises it further. Other risk factors include a small, thin body frame, a family history of osteoporosis, not getting enough calcium and vitamin D, and not being active enough. Smoking, drinking too much alcohol, having an eating disorder, and some medicines for long-term health problems also raise the risk. Before menopause, going 3 months in a row without a period also raises your risk.",
        },
        {
          heading: "Protecting your bones",
          body: "Weight-bearing activity, where your feet and legs carry your weight, such as walking, helps build bone and slow bone loss. Getting enough calcium and vitamin D matters at every age, and the calcium and vitamin D article explains how much you need. Not smoking lowers your risk of broken bones, and if you drink alcohol, keeping to moderate amounts helps. HRT also helps prevent osteoporosis, and a doctor can talk through whether it suits you.",
        },
        {
          heading: "Tests and treatment",
          body: "A bone density test, usually a type of X-ray scan called DXA, shows how strong your bones are. In the United States, testing is advised for women from 65, or earlier if they have risk factors. Guidance differs between countries, so ask a doctor or nurse. If you have osteoporosis, medicines such as bisphosphonates, denosumab or HRT can help. Talk to a doctor or nurse if you have risk factors, went through menopause early, or have broken a bone more easily than expected.",
        },
      ],
      notice: "This is general information. A doctor or nurse can check your bone health and tell you whether you need a bone density test.",
    },
  },
  {
    slug: "postmenopausal-bleeding",
    category: "menopause",
    reviewedAt: "2026-10-04",
    sources: [
      { label: "NHS — Postmenopausal bleeding", href: "https://www.nhs.uk/conditions/post-menopausal-bleeding/" },
      { label: "Office on Women's Health — Menopause basics", href: "https://www.womenshealth.gov/menopause/menopause-basics" },
      { label: "Office on Women's Health — Menopause symptoms and relief", href: "https://www.womenshealth.gov/menopause/menopause-symptoms-and-relief" },
      { label: "NHS — Side effects of HRT", href: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/side-effects-of-hormone-replacement-therapy-hrt/" },
    ],
    related: ["gynecologic-cancers", "menopause-symptoms", "spotting"],
    en: {
      title: "Bleeding after menopause",
      summary: "Any bleeding from the vagina after menopause should be checked by a doctor promptly, even if it is light or happens once. Most causes are not cancer, but it must be checked.",
      sections: [
        {
          heading: "What counts as bleeding after menopause",
          body: "Postmenopausal bleeding is any bleeding from the vagina after your menopause, which means after you have gone 12 months without a period. It includes spotting and very light bleeding. It needs to be checked even if it is only a small amount, or if it has only happened once.",
        },
        {
          heading: "Why it needs checking",
          body: "Most of the time the cause is not serious. Sometimes, though, bleeding is an early sign of cancer, such as womb cancer, which is why a check matters. Finding the cause early means that any problem can be treated sooner. See a doctor or nurse as soon as possible, and do not wait to see whether it happens again.",
        },
        {
          heading: "Common causes",
          body: "Most often, the cause is not cancer. Lower oestrogen after menopause can make the lining of the vagina or the womb thinner and inflamed (atrophic vaginitis or endometrial atrophy). Polyps, which are small growths on the cervix or in the womb, are another cause and are usually not cancer. A thickened womb lining (endometrial hyperplasia) can also cause bleeding. Less often, the cause is cancer, such as womb or ovarian cancer.",
        },
        {
          heading: "What tests to expect",
          body: "A doctor will usually examine your pelvis and vagina. You may be offered a vaginal ultrasound scan to look at your womb. Some people also have a hysteroscopy, where a thin camera is used to look inside the womb, and a small sample of tissue (biopsy) may be taken for testing. Treatment depends on what the tests find.",
        },
        {
          heading: "When to get help",
          body: "Book an appointment with a doctor as soon as possible for any bleeding after menopause, even if it has already stopped. Noting the dates and how heavy it was, for example in Ciclo, can help you describe it. If you take HRT, some bleeding is expected. Some types cause a monthly bleed, and spotting is common in the first few months. See a doctor if irregular bleeding lasts more than 6 months after starting HRT, gets heavier, or starts after your bleeding had stopped. Get emergency help if the bleeding is very heavy and you feel dizzy or faint.",
        },
      ],
      notice: "This is general information, not a diagnosis. Any bleeding after menopause should be checked by a doctor, even if it is light or has stopped.",
    },
  },
];
