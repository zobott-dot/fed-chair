// Volcker Scenario Intro Briefing — Structured Content Data
// Six sections of historically researched narrative for the Volcker Disinflation scenario (1979–1982)

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

window.FedChair.Data.volckerIntro = {
  scenario: 'volcker',
  sections: [

    // =========================================================================
    // SECTION 1: The Phone Call
    // STATUS: Placeholder — content locked in prior session, awaiting paste
    // =========================================================================
    {
      id: 'section-1',
      number: 1,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter One',
      title: 'The phone call',
      deck: 'October 6, 1979. A Saturday.',
      type: 'editorial',
      content: {
        blocks: [
          { type: 'paragraph', text: '<em>[Section 1 content locked in prior design session. Paste the full prose for "The Phone Call" here.]</em>', isFirst: true },
          { type: 'paragraph', text: 'This section will contain the narrative opening of the Volcker scenario — the Saturday morning phone call that changed monetary policy forever.' }
        ]
      }
    },

    // =========================================================================
    // SECTION 2: The World You're Inheriting
    // STATUS: COMPLETE — verbatim from prompt
    // =========================================================================
    {
      id: 'section-2',
      number: 2,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Two',
      title: 'The world you\u2019re inheriting',
      deck: 'A decade of fever, and the letters no one wanted to write.',
      type: 'editorial',
      conventions: 'Passages with a dotted underline open in place. Touch any one to go deeper, or read past them to keep moving.',
      content: {
        blocks: [
          // ---- Paragraph 1 (drop cap) ----
          {
            type: 'paragraph',
            isFirst: true,
            text: 'In November 1979, a month after Paul Volcker told the nation that the rules had changed, a woman in Chicago who signed herself only as <span class="gateway" data-depth="d-cm">C.M.</span> wrote a letter to a newspaper advice column. Her husband was a maintenance worker. He made about fourteen thousand dollars a year. They had two young children. She had started babysitting other people\u2019s kids for extra money, which caused problems with her own kids, but they needed the money. With rising rents and heat, she wrote, there was nothing left for movies or dances or clothes. \u201cNow it looks like inflation is going to get even worse,\u201d she wrote, \u201cand I just start crying when I think about it.\u201d She wanted to know if her problem was one a psychiatrist could help her with, or if she should just stick it out.'
          },
          // ---- Depth: C.M. ----
          {
            type: 'depth',
            id: 'd-cm',
            label: 'In depth \u00b7 C.M., Chicago',
            title: '\u201cI feel I would get over this if I just had more money.\u201d',
            paragraphs: [
              'C.M.\u2019s letter was published on November 8, 1979, in a syndicated column by Dr. Alvin Poussaint, a Harvard psychiatrist better known to later generations as the production consultant who kept <em>The Cosby Show</em> honest about Black family life. In 1979 he was writing a weekly column on mental health, and by late that year a growing share of his mail was about money.',
              'C.M. described feeling \u201csilly\u201d for not being able to cope with inflation. \u201cI know that inflation affects everyone,\u201d she wrote, \u201cand I feel silly sometimes because I feel like I\u2019m being a baby.\u201d The shame is the detail that matters most. She wasn\u2019t angry. She wasn\u2019t blaming anyone. She thought the problem might be her.',
              'Poussaint\u2019s response was careful. \u201cMore people are suffering from tension and depression due to the deteriorating economy than most people realize,\u201d he wrote. \u201cMany individuals complain about rising prices but few feel comfortable admitting that they are developing emotional symptoms as a result of it.\u201d He suggested community involvement and, if the depression persisted, counseling. He did not tell her the problem was her. He told her the problem was real.',
              'By late 1979, advice columns and family counselors across the country were fielding a new kind of mail. The specific humiliation of the decade was that ordinary people had been told by economists and politicians that inflation was structural, unavoidable, something to be adjusted to. Families who couldn\u2019t adjust concluded they were failing personally. C.M. was one of millions. Her letter just happened to get printed.'
            ]
          },
          // ---- Paragraph 2 ----
          {
            type: 'paragraph',
            text: 'By the fall of 1979, millions of American families were keeping a version of C.M.\u2019s ledger in their heads. It didn\u2019t require an economics degree. A gallon of gas that cost thirty-six cents in 1972 was pushing a dollar. A loaf of bread that cost a quarter was approaching fifty cents. Ground beef had doubled. A dozen eggs had doubled. A first-class postage stamp had gone from eight cents to fifteen. Every trip to the supermarket confirmed what the government statisticians confirmed a few weeks later on the evening news: the money in your wallet was worth less than it had been the month before, and less than that the month before.'
          },
          // ---- Paragraph 3 ----
          {
            type: 'paragraph',
            text: 'The strange part was that it had been going on for so long most people couldn\u2019t remember when it had started. A teenager in 1979 had never known a year of stable prices. A young married couple had never made a household budget that actually held. Economists had a word for what was happening \u2014 <span class="gateway" data-depth="d-stagflation">stagflation</span> \u2014 but the word was new and the condition it named was so contrary to everything the textbooks said that for most of the decade the people who ran the economy had refused to believe it was real.'
          },
          // ---- Depth: Stagflation ----
          {
            type: 'depth',
            id: 'd-stagflation',
            label: 'In depth \u00b7 Stagflation',
            title: 'The word the textbooks didn\u2019t have.',
            paragraphs: [
              'Through the 1960s, American economists believed \u2014 on the authority of a famous empirical paper by the New Zealand economist A. W. Phillips \u2014 that inflation and unemployment moved in opposite directions. If one went up, the other went down. You could have high employment and stable prices, or you could have a recession and lower prices, but you couldn\u2019t have rising prices and rising unemployment at the same time. The Phillips curve was one of the pillars of postwar macroeconomics, and Washington built its policies on it.',
              'The 1970s demolished the pillar. Unemployment rose. Inflation rose. The curve that wasn\u2019t supposed to exist appeared on every economist\u2019s blackboard, and no one had a theory for it. The <em>Washington Post</em> columnist Joseph Kraft coined the portmanteau <em>stagflation</em> in 1972 to describe it \u2014 stagnation plus inflation \u2014 and the word stuck because there wasn\u2019t a better one. Milton Friedman had been warning since the late 1960s that something like this was possible; his monetarist critique of Keynesian demand management suddenly looked prescient, and a generation of young economists began rebuilding the field around his insights.',
              'But theory is cold comfort when a union contract is indexed to last year\u2019s inflation and this year\u2019s prices are already higher. For ordinary households, stagflation meant your paycheck chased prices that always stayed a step ahead. The psychology of it \u2014 the sense that the ground itself was sliding \u2014 was the hardest part to explain to anyone who hadn\u2019t lived through it.'
            ]
          },
          // ---- Paragraph 4 ----
          {
            type: 'paragraph',
            text: 'The fever had started almost a decade earlier, in August 1971, when Richard Nixon closed the gold window and ended the Bretton Woods system that had anchored the dollar since World War II. Nixon imposed wage and price controls at the same time, which worked briefly and then failed spectacularly when they were lifted. Then came the first oil shock, in October 1973, when the Arab members of OPEC embargoed countries that had supported Israel in the Yom Kippur War, and the price of a barrel of crude quadrupled in six months. Gas lines formed. Speed limits dropped to fifty-five. Consumer prices jumped eleven percent in 1974 alone.'
          },
          // ---- Paragraph 5 ----
          {
            type: 'paragraph',
            text: 'Gerald Ford tried to fight inflation with <span class="gateway" data-depth="d-win">lapel buttons</span>. Jimmy Carter tried to fight it with sermons. Neither approach worked, and by the summer of 1979 the second oil shock \u2014 triggered by the Iranian Revolution \u2014 had pushed inflation back into double digits and shoved unemployment up alongside it. In July, Carter went on national television and delivered a speech that his staff had titled <em>A Crisis of Confidence</em>. Critics called it the malaise speech, though Carter never used that word. He told the country that it was suffering a spiritual sickness. Then, two days later, he fired his entire cabinet. The small bounce his speech had earned him collapsed overnight. By September his approval rating had touched nineteen percent \u2014 the lowest any American president had ever recorded in a national poll.'
          },
          // ---- Depth: Whip Inflation Now ----
          {
            type: 'depth',
            id: 'd-win',
            label: 'In depth \u00b7 Whip Inflation Now',
            title: 'Lapel buttons against an eleven-percent fever.',
            paragraphs: [
              'In October 1974, two months after taking office, Gerald Ford stood before a joint session of Congress and announced a program to fight inflation. Its centerpiece was a voluntary public campaign called Whip Inflation Now. Americans were asked to wear red-and-white lapel buttons reading WIN, to grow victory gardens, to clean their plates, to carpool, to lower their thermostats, and to make pledges of personal sacrifice against rising prices. Ford distributed twelve million buttons. He wore one himself.',
              'The program was ridiculed almost immediately. Alan Greenspan, then chairman of Ford\u2019s Council of Economic Advisers, later called it \u201cunbelievably stupid.\u201d The economist Herbert Stein said it was \u201cmeasles of the spirit.\u201d Within months the buttons had become a punchline, and by the time Ford left office they were a symbol of a government that had mistaken inflation for a morale problem.',
              'But WIN mattered, even as a failure. It marked the moment American policy gave up on serious anti-inflation measures and tried to substitute civic virtue. The lesson the next generation of policymakers took from WIN was that inflation could not be shamed out of existence. It could only be broken. Whoever did the breaking would be hated for a while.'
            ]
          },
          // ---- Paragraph 6 ----
          {
            type: 'paragraph',
            text: 'Six weeks after the malaise speech, Carter nominated Paul Volcker to run the Federal Reserve. Six weeks after <em>that</em>, Volcker flew to Belgrade for the annual meetings of the International Monetary Fund. The keynote lecture that year was delivered by a man named <span class="gateway" data-depth="d-burns">Arthur Burns</span>, who had chaired the Federal Reserve from 1970 to 1978 \u2014 the chairman, in other words, under whose watch most of the decade\u2019s inflation had been generated. Burns\u2019s lecture was titled <em>The Anguish of Central Banking</em>. It was, in effect, a confession.'
          },
          // ---- Depth: Arthur Burns ----
          {
            type: 'depth',
            id: 'd-burns',
            label: 'In depth \u00b7 Arthur Burns in Belgrade',
            title: 'The confession that changed the decade.',
            paragraphs: [
              'Arthur Burns was seventy-five years old in September 1979, retired from the Fed for a year, and still the most respected central banker in the Western world. He had been a mentor to a generation of economists, an adviser to Eisenhower, and a trusted confidant of Nixon. And under his chairmanship, from 1970 to 1978, inflation in the United States had climbed from below five percent to above nine \u2014 the largest peacetime increase in American history to that point.',
              'On September 30, 1979, Burns stood before the delegates of the IMF and the World Bank in Belgrade and delivered the annual Per Jacobsson Lecture. He titled it <em>The Anguish of Central Banking</em>. His thesis was that central bankers, despite their training, their traditions, and the powerful tools at their command, had failed utterly to contain inflation in the 1970s, and that this failure was not an accident. It was the structural consequence of democracy. Modern governments had committed themselves to high employment and to a long list of social obligations that required accommodating monetary policy. Central banks that resisted were isolated, pressured, and overruled. Central banks that complied watched inflation rise. Burns saw no way out.',
              '\u201cBy training, if not also by temperament,\u201d Burns told the room, central bankers \u201care inclined to lay great stress on price stability, and their abhorrence of inflation is continually reinforced by contacts with one another and with like-minded members of the private financial community. And yet, despite their antipathy to inflation and the powerful weapons they could wield against it, central bankers have failed so utterly in this mission in recent years. In this paradox lies the anguish of central banking.\u201d',
              'Paul Volcker was in the room. He had flown to Belgrade days earlier and had been meeting privately with European finance ministers who were urging him, in the plainest terms, to do something stern about the dollar. Burns\u2019s lecture was the argument Volcker had come to Belgrade to refute. Burns said central banks could not fight inflation because politics would not let them. Volcker, listening from the audience, disagreed. Six days later he was back in Washington, calling an unscheduled FOMC meeting to prove it.',
              'Neither man acknowledged the other publicly that week. But the decade turned, quietly, in that lecture hall.'
            ]
          },
          // ---- Paragraph 7 ----
          {
            type: 'paragraph',
            text: 'Burns told the room that central banks had the theoretical power to stop inflation but not the political will. Volcker, sitting in the audience, disagreed. Six days later he was back in Washington, calling the meeting that would prove him right. What he could not tell C.M. in Chicago, or anyone else, was that breaking the fever would get worse before it got better. Much worse. Interest rates would go up before inflation came down. Unemployment would go up with them. The very people writing letters to advice columns about the grocery bill were the people who would lose their jobs first.'
          },
          // ---- Pullquote ----
          {
            type: 'pullquote',
            text: '\u201cMore people are suffering from tension and depression due to the deteriorating economy than most people realize.\u201d',
            attribution: '\u2014 Dr. Alvin Poussaint, syndicated column, November 8, 1979'
          },
          // ---- Paragraph 8 ----
          {
            type: 'paragraph',
            text: 'This was the world Paul Volcker inherited, and the world you inherit with him. A decade of accelerating prices. A public that had learned to expect them. A political class that had run out of ideas. A predecessor who had just given a public eulogy for the idea that central banks could even try. And somewhere in Chicago, a woman with two young children who had started crying when she thought about what was coming next, because what was coming next was going to be harder than what she\u2019d already lived through.'
          },
          // ---- Paragraph 9 ----
          {
            type: 'paragraph',
            text: 'You\u2019re going to be the one who makes it harder. And then, if you hold your nerve, the one who makes it stop.'
          }
        ]
      }
    },

    // =========================================================================
    // SECTION 3: The Cast
    // STATUS: Placeholder — full card content in external HTML file
    // =========================================================================
    {
      id: 'section-3',
      number: 3,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Three',
      title: 'The cast',
      deck: 'Nineteen at the table. A president who needs help. A country running out of patience.',
      type: 'dossier',
      conventions: 'Tap any card to open it. Voting tags mark who carries a vote at the October 6, 1979 meeting. Hawk and dove tags mark where each Fed member sits on the tightening question.',
      content: {
        intro: 'The Federal Open Market Committee has nineteen members. Twelve vote at any given meeting \u2014 the seven governors always, plus five of the twelve regional bank presidents on a rotating basis. The New York Fed president always votes; the other four voting seats rotate annually among the remaining eleven banks. Every president attends, speaks, and argues. Only the voters decide.',
        groups: [
          {
            header: 'The Board of Governors \u00b7 Washington',
            note: 'Seven seats, all with a vote at every meeting.',
            cards: [
              {
                id: 'volcker',
                name: 'Paul Volcker',
                roleInline: 'Chairman of the Board of Governors',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Chair', type: 'hawk' }],
                hook: 'Six foot seven. Cigar smoke and silence. The man who decided the fever had to break.',
                cardClass: 'voting',
                depth: ['[Full Volcker card content — paste from volcker-section-3.html]']
              },
              {
                id: 'schultz',
                name: 'Frederick Schultz',
                roleInline: 'Vice Chairman',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'A Florida banker and Carter appointee. Loyal to Volcker, but watching the political cost.',
                cardClass: 'voting',
                depth: ['[Full Schultz card content — paste from volcker-section-3.html]']
              },
              {
                id: 'wallich',
                name: 'Henry Wallich',
                roleInline: 'Governor',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'Fled Nazi Germany. Saw hyperinflation firsthand. The hardest hawk in the room.',
                cardClass: 'voting',
                depth: ['[Full Wallich card content — paste from volcker-section-3.html]']
              },
              {
                id: 'coldwell',
                name: 'Philip Coldwell',
                roleInline: 'Governor',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'A career Fed man. Trusted the institution. Trusted Volcker more.',
                cardClass: 'voting',
                depth: ['[Full Coldwell card content — paste from volcker-section-3.html]']
              },
              {
                id: 'partee',
                name: 'J. Charles Partee',
                roleInline: 'Governor',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Dove-lean', type: 'dove' }],
                hook: 'A Burns-era holdover with reservations about shock therapy.',
                cardClass: 'voting',
                depth: ['[Full Partee card content — paste from volcker-section-3.html]']
              },
              {
                id: 'teeters',
                name: 'Nancy Teeters',
                roleInline: 'Governor',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Dove', type: 'dove' }],
                hook: 'The first woman on the Board. The loudest voice against the pain.',
                cardClass: 'voting',
                depth: ['[Full Teeters card content — paste from volcker-section-3.html]']
              },
              {
                id: 'rice',
                name: 'Emmett Rice',
                roleInline: 'Governor',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Dove-lean', type: 'dove' }],
                hook: 'Two months on the Board. Skeptical of monetarism, willing to try.',
                cardClass: 'voting',
                depth: ['[Full Rice card content — paste from volcker-section-3.html]']
              }
            ]
          },
          {
            header: 'The Reserve Bank Presidents \u00b7 Voting',
            note: 'Four regional presidents hold rotating votes through 1979. The New York seat is vacant \u2014 and will stay that way until April 1980.',
            cards: [
              {
                id: 'ny-vacant',
                name: '[Vacant]',
                roleInline: 'President, Federal Reserve Bank of New York',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'NY', type: 'mod' }],
                hook: 'The vice-chair seat is empty. Volcker left it behind when he took the chair.',
                cardClass: 'voting',
                depth: ['[Full NY vacant card content — paste from volcker-section-3.html]']
              },
              {
                id: 'black',
                name: 'Robert Black',
                roleInline: 'President, Federal Reserve Bank of Richmond',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'A monetarist true believer. Would go further than Volcker if he could.',
                cardClass: 'voting',
                depth: ['[Full Black card content — paste from volcker-section-3.html]']
              },
              {
                id: 'mayo',
                name: 'Robert Mayo',
                roleInline: 'President, Federal Reserve Bank of Chicago',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'Nixon\u2019s former budget director. Knew the political stakes. Voted to tighten anyway.',
                cardClass: 'voting',
                depth: ['[Full Mayo card content — paste from volcker-section-3.html]']
              },
              {
                id: 'kimbrel',
                name: 'Monroe Kimbrel',
                roleInline: 'President, Federal Reserve Bank of Atlanta',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Pragmatist', type: 'mod' }],
                hook: 'A quiet pragmatist. Not ideological, but the numbers scared him.',
                cardClass: 'voting',
                depth: ['[Full Kimbrel card content — paste from volcker-section-3.html]']
              },
              {
                id: 'willes',
                name: 'Mark Willes',
                roleInline: 'President, Federal Reserve Bank of Minneapolis',
                tags: [{ label: 'Voting', type: 'vote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'An academic economist turned central banker. Believed in credible commitment.',
                cardClass: 'voting',
                depth: ['[Full Willes card content — paste from volcker-section-3.html]']
              }
            ]
          },
          {
            header: 'The Reserve Bank Presidents \u00b7 Non-Voting',
            note: 'Seven regional presidents attend, participate, and cannot vote. Four of them rotate into voting seats at the first meeting of 1980.',
            cards: [
              {
                id: 'morris',
                name: 'Frank Morris',
                roleInline: 'President, Federal Reserve Bank of Boston',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'A pragmatic centrist who worried about the real economy.',
                cardClass: 'nonvoting',
                depth: ['[Full Morris card content — paste from volcker-section-3.html]']
              },
              {
                id: 'eastburn',
                name: 'David Eastburn',
                roleInline: 'President, Federal Reserve Bank of Philadelphia',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Dove-lean', type: 'dove' }],
                hook: 'An old hand, nearing retirement. Uneasy with the new regime.',
                cardClass: 'nonvoting',
                depth: ['[Full Eastburn card content — paste from volcker-section-3.html]']
              },
              {
                id: 'winn',
                name: 'Willis Winn',
                roleInline: 'President, Federal Reserve Bank of Cleveland',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'Steady, institutional, not given to dramatics. A reliable centrist.',
                cardClass: 'nonvoting',
                depth: ['[Full Winn card content — paste from volcker-section-3.html]']
              },
              {
                id: 'roos',
                name: 'Lawrence Roos',
                roleInline: 'President, Federal Reserve Bank of St. Louis',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'A Friedman disciple. Believed the money supply was the only lever that mattered.',
                cardClass: 'nonvoting',
                depth: ['[Full Roos card content — paste from volcker-section-3.html]']
              },
              {
                id: 'baughman',
                name: 'Ernest Baughman',
                roleInline: 'President, Federal Reserve Bank of Dallas',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'Texas oil country. Saw inflation up close. Wanted it stopped.',
                cardClass: 'nonvoting',
                depth: ['[Full Baughman card content — paste from volcker-section-3.html]']
              },
              {
                id: 'guffey',
                name: 'Roger Guffey',
                roleInline: 'President, Federal Reserve Bank of Kansas City',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Moderate', type: 'mod' }],
                hook: 'A careful moderate from farm country. Knew the interest-rate pain was coming.',
                cardClass: 'nonvoting',
                depth: ['[Full Guffey card content — paste from volcker-section-3.html]']
              },
              {
                id: 'balles',
                name: 'John Balles',
                roleInline: 'President, Federal Reserve Bank of San Francisco',
                tags: [{ label: 'Non-voting', type: 'novote' }, { label: 'Hawk', type: 'hawk' }],
                hook: 'A monetarist in the Friedman orbit. San Francisco\u2019s voice for tightening.',
                cardClass: 'nonvoting',
                depth: ['[Full Balles card content — paste from volcker-section-3.html]']
              }
            ]
          }
        ],
        pullquote: {
          text: '\u201cNothing could get Henry to admit anything...\u201d',
          attribution: '\u2014 Nancy Teeters on Henry Wallich, oral history, 2008'
        },
        civilianGroups: [
          {
            header: 'The White House',
            cards: [
              {
                id: 'carter',
                name: 'Jimmy Carter',
                roleInline: 'President of the United States',
                tags: [{ label: 'President', type: 'civ' }],
                hook: 'Nineteen-percent approval. Running for re-election against his own party.',
                cardClass: 'civilian',
                depth: ['[Full Carter card content — paste from volcker-section-3.html]']
              },
              {
                id: 'miller',
                name: 'G. William Miller',
                roleInline: 'Secretary of the Treasury',
                tags: [{ label: 'Treasury', type: 'civ' }],
                hook: 'Volcker\u2019s predecessor at the Fed. Carter moved him to Treasury to make room.',
                cardClass: 'civilian',
                depth: ['[Full Miller card content — paste from volcker-section-3.html]']
              },
              {
                id: 'schultze',
                name: 'Charles Schultze',
                roleInline: 'Chairman, Council of Economic Advisers',
                tags: [{ label: 'White House', type: 'civ' }],
                hook: 'A Keynesian who believed in gradualism. The anti-Volcker in the West Wing.',
                cardClass: 'civilian',
                depth: ['[Full Schultze card content — paste from volcker-section-3.html]']
              }
            ]
          },
          {
            header: 'The Opposition',
            cards: [
              {
                id: 'kennedy',
                name: 'Ted Kennedy',
                roleInline: 'Senator, Massachusetts \u00b7 Primary challenger',
                tags: [{ label: 'Primary challenger', type: 'civ' }],
                hook: 'Challenging Carter from the left. The recession is his argument.',
                cardClass: 'civilian',
                depth: ['[Full Kennedy card content — paste from volcker-section-3.html]']
              },
              {
                id: 'reagan',
                name: 'Ronald Reagan',
                roleInline: 'Former Governor of California \u00b7 Republican challenger',
                tags: [{ label: 'Republican challenger', type: 'civ' }],
                hook: 'Running on the question: are you better off than you were four years ago?',
                cardClass: 'civilian',
                depth: ['[Full Reagan card content — paste from volcker-section-3.html]']
              }
            ]
          },
          {
            header: 'Labor',
            cards: [
              {
                id: 'fraser',
                name: 'Douglas Fraser',
                roleInline: 'President, United Auto Workers',
                tags: [{ label: 'Labor', type: 'civ' }],
                hook: 'The voice of organized labor. The first to feel the unemployment.',
                cardClass: 'civilian',
                depth: ['[Full Fraser card content — paste from volcker-section-3.html]']
              }
            ]
          },
          {
            header: 'The Country',
            cards: [
              {
                id: 'farmers',
                name: 'The farmers',
                roleInline: 'Debt-financed agriculture',
                tags: [{ label: 'Debt-financed', type: 'civ' }],
                hook: 'Borrowed at variable rates to buy land at inflated prices. Rate hikes could bankrupt them.',
                cardClass: 'civilian',
                depth: ['[Full farmers card content — paste from volcker-section-3.html]']
              },
              {
                id: 'builders',
                name: 'Home-builders and car dealers',
                roleInline: 'Rate-sensitive industries',
                tags: [{ label: 'Rate-sensitive', type: 'civ' }],
                hook: 'The first industries to shut down when rates go up. They will let Volcker know.',
                cardClass: 'civilian',
                depth: ['[Full builders card content — paste from volcker-section-3.html]']
              },
              {
                id: 'wallstreet',
                name: 'Wall Street',
                roleInline: 'Bond traders \u00b7 gold bugs',
                tags: [{ label: 'Bond traders', type: 'civ' }, { label: 'Gold bugs', type: 'civ' }],
                hook: 'The bond market is the referendum. Gold is the dissent. Both are watching.',
                cardClass: 'civilian',
                depth: ['[Full Wall Street card content — paste from volcker-section-3.html]']
              }
            ]
          }
        ],
        coda: 'This is who is in the room, and who is at the gate. You are about to walk into a meeting with twelve votes in it, and you need seven of them. You probably have them. Probably.'
      }
    },

    // =========================================================================
    // SECTION 4: The Instrument
    // STATUS: Placeholder — full content in external HTML file
    // =========================================================================
    {
      id: 'section-4',
      number: 4,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Four',
      title: 'The instrument',
      deck: 'Not a rate hike. A change in the rules of the game itself.',
      type: 'editorial',
      conventions: 'Passages with a dotted underline open in place. Touch any one to go deeper, or read past them to keep moving.',
      content: {
        blocks: [
          { type: 'paragraph', text: '<em>[Section 4 content to be pasted from volcker-section-4.html. This section covers Volcker\u2019s operating-procedure switch \u2014 targeting reserves instead of the fed funds rate.]</em>', isFirst: true },
          { type: 'paragraph', text: 'This section will contain 7 body paragraphs, 4 depth panels (the operating procedure, the monetarist question, the three-part announcement, the signal), and 1 pullquote.' }
        ]
      }
    },

    // =========================================================================
    // SECTION 5: The Stakes
    // STATUS: Placeholder — full content in external HTML file
    // =========================================================================
    {
      id: 'section-5',
      number: 5,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Five',
      title: 'The stakes',
      deck: 'What winning looks like. What losing costs. Why both hurt.',
      type: 'editorial',
      conventions: 'Passages with a dotted underline open in place.',
      content: {
        blocks: [
          { type: 'paragraph', text: '<em>[Section 5 content to be pasted from volcker-sections-5-6.html. This section covers win/lose conditions and human cost.]</em>', isFirst: true },
          { type: 'paragraph', text: 'This section will contain 4 body paragraphs, 3 depth panels (the win condition, the lose conditions, the human cost), 3 condition cards, and 1 pullquote.' },
          // Condition cards (these are specified in the prompt)
          {
            type: 'conditions',
            cards: [
              { cardType: 'win', header: 'Win condition', title: 'Break the fever', text: 'PCE inflation below 6% at the end of Meeting 8 \u2014 regardless of unemployment, regardless of political cost.' },
              { cardType: 'fail', header: 'Lose condition \u00b7 weakness', title: 'Fail to break it', text: 'PCE inflation above 10% at the end of Meeting 8. You had the tools. You didn\u2019t use them.' },
              { cardType: 'fail', header: 'Lose condition \u00b7 recklessness', title: 'Lose their trust', text: 'Credibility below 20 at any point. The markets stop believing you. Your policy stops working.' }
            ]
          }
        ]
      }
    },

    // =========================================================================
    // SECTION 6: The Morning After Tomorrow
    // STATUS: COMPLETE — verbatim from prompt
    // =========================================================================
    {
      id: 'section-6',
      number: 6,
      kicker: 'Scenario One \u00b7 The Volcker Shock \u00b7 Chapter Six',
      title: 'The morning after tomorrow',
      deck: 'Starting conditions \u00b7 October 6, 1979',
      type: 'data-panel',
      content: {
        conditions: [
          { label: 'Fed Funds Rate', value: '11.50%', accent: true },
          { label: 'PCE Inflation', value: '12.2%', accent: true },
          { label: 'Core CPI', value: '11.8%', accent: false },
          { label: 'Unemployment', value: '6.0%', accent: false },
          { label: 'GDP Growth', value: '1.0%', accent: false },
          { label: 'S&P 500', value: '107', accent: false },
          { label: '10Y Treasury', value: '10.5%', accent: false },
          { label: '2Y Treasury', value: '11.8%', accent: false },
          { label: 'Gold', value: '$395/oz', accent: false },
          { label: 'Credibility', value: '40 / 100', accent: true }
        ],
        meetings: [
          { number: 1, date: 'October 6, 1979', note: 'Saturday. Unscheduled. The one that changes everything.' },
          { number: 2, date: 'January 9, 1980', note: 'First regular meeting of the new year. Voting rotation changes.' },
          { number: 3, date: 'March 18, 1980', note: 'Carter\u2019s credit controls land. Rates near 20%.' },
          { number: 4, date: 'May 20, 1980', note: 'Recession arrives. Credit controls backfire. The first test of nerve.' },
          { number: 5, date: 'August 12, 1980', note: 'Brief recession ends. Inflation rebounds. Back to tightening.' },
          { number: 6, date: 'November 18, 1980', note: 'Reagan wins. Unemployment rising above 7%.' },
          { number: 7, date: 'February 3, 1981', note: 'Deep recession. Rates near 20% again. The tractors are coming.' },
          { number: 8, date: 'May 18, 1981', note: 'Final meeting. Is the fever breaking?' }
        ],
        codaParagraphs: [
          'After each of your eight meetings, the game will show you what the real Paul Volcker decided at the same juncture \u2014 his rate move, his statement, the market\u2019s reaction. You will see your path and his path side by side on the same chart. At the end, the game will compare your inflation, your unemployment, and your credibility to his. He won. The question is whether you win the same way, or a different way, or not at all.',
          'You do not have a dot plot. It did not exist until 2012. You do not have quantitative easing. It was not invented until 2008. You do not hold press conferences after FOMC meetings. That practice began in 2011. Your tools are the ones Volcker had: the federal funds rate, the discount rate, and a statement released through the press office. <em>That is all.</em>'
        ],
        finalLine: 'You are Paul Volcker, and the morning after tomorrow, the markets open.'
      }
    }
  ]
};
