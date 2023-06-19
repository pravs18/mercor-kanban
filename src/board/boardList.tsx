import { useState } from "react";
import './boardList.css';
import ellipse1 from '../assest/ellipse1.svg';
import ellipse2 from '../assest/ellipse2.svg';
import ellipse3 from '../assest/ellipse3.svg';
import ellipse4 from '../assest/ellipse4.svg';
import ellipse5 from '../assest/ellipse5.svg';
import ellipse6 from '../assest/ellipse6.svg';
import ellipse7 from '../assest/ellipse7.svg';
import ellipse8 from '../assest/ellipse8.svg';
import ellipse9 from '../assest/ellipse9.svg';
import ellipse10 from '../assest/ellipse10.svg';
import ellipse11 from '../assest/ellipse11.svg';
import ellipse_onprogress1 from '../assest/ellipse_onprogress1.svg';
import ellipse_onprogress2 from '../assest/ellipse_onprogress2.svg';
import ellipse_onprogress3 from '../assest/ellipse_onprogress3.svg';
import done from '../assest/done.svg';
import Board from "./board";



const initialLists = [
    {
        title: "To Do",
        style: {
            background: "#5030E5"
        },
        status: "todo",
    },
    {
        title: "On Progress",
        style: {
            background: "#FFA500"
        },
        status: "doing",
    },
    {
        title: "Done",
        style: {
            background: "#76A5EA"
        },
        status: "done",
    },
];

const initialData = {
    todo: [
        {
            id: "qwe1",
            tag: "Low",
            title: "Brainstroming",
            text: "Brainstorming brings team members' diverse experience into play.",
            status: "todo",
            avatar: [
                ellipse1,
                ellipse2,
                ellipse3
            ],
            comments: 12,
            files: 0,
            order: 1,
            label: "UI Dev",
        },
        {
            id: "qwe3",
            tag: "High",
            title: "Research",
            text: "User research helps you to create an optimal product for users.",
            status: "todo",
            avatar: [
                ellipse4,
                ellipse5
            ],
            comments: 10,
            files: 3,
            order: 2,
            label: "UI Dev",
        },
        {
            id: "qwe5",
            tag: "High",
            title: "Wireframes",
            text: "Low fidelity wireframes include the most basic content and visuals.",
            status: "todo",
            avatar: [
                ellipse6,
                ellipse7,
                ellipse8
            ],
            comments: 12,
            files: 13,
            order: 3,
            label: "Testing",
        },
    ],
    doing: [
        {
            id: "qwe2",
            tag: "Low",
            title: "Onboarding Illustrations",
            image: [ellipse_onprogress1],
            status: "doing",
            avatar: [
                ellipse9,
                ellipse10,
                ellipse11
            ],
            comments: 14,
            files: 15,
            order: 1,
            label: "API Integration",
        },
        {
            id: "qwe6",
            tag: "Low",
            title: "Moodboard",
            image: [ellipse_onprogress2, ellipse_onprogress3],
            status: "doing",
            avatar: [
                ellipse9
            ],
            comments: 9,
            files: 10,
            order: 1,
            label: "API Integration",
        },
        {
            id: "qwe7",
            tag: "High",
            title: "Onboarding Illustration",
            image: [ellipse_onprogress2],
            status: "doing",
            avatar: [
                ellipse9,
                ellipse10,
                ellipse11
            ],
            comments: 14,
            files: 15,
            order: 1,
            label: "API Integration",
        },
    ],
    done: [
        {
            id: "qwe4",
            tag: "completed",
            title: "Mobile App Design",
            image: [done],
            status: "done",
            avatar: [
                ellipse4,
                ellipse5
            ],
            comments: 12,
            files: 15,
            order: 1,
            label: "Bug Fix",
        },
        {
            id: "qwe8",
            tag: "completed",
            title: "Design system",
            status: "done",
            text: "It just needs to adapt the UI from what you did before ",
            avatar: [
                ellipse9,
                ellipse10,
                ellipse11
            ],
            comments: 12,
            files: 15,
            order: 1,
            label: "Bug Fix",
        },
    ],
};

const BoardList: React.FC = () => {
// export function BoardList() {
    const [lists, setLists] = useState<any>(initialLists);
    const [data, setData] = useState<any>(initialData);

    // Handle Lists
    // Handle Lists ends here

    // Handle Data
    const cardChangeHandler = (cardInfo: any, newStatus: any, targetCardId: any) => {
        const { id, status: oldStatus } = cardInfo;

        let dropCard = data[oldStatus].find((el: any) => el.id === id);
        let targetCard =
            targetCardId !== ""
                ? data[newStatus].find((el: any) => el.id === targetCardId)
                : null;

        let newListOrderValueMax = data[newStatus]
            .map((item: any) => item.order)
            .reduce((maxValue: any, a: any) => Math.max(maxValue, a), 0);

        // CASE 1: If same list, work only this if block then return;
        if (oldStatus === newStatus) {
            let temp: any = data[oldStatus]
                .map((item: any) => {
                    if (item.id === dropCard.id)
                        return {
                            ...dropCard,
                            order: targetCard
                                ? targetCard.order - 1
                                : newListOrderValueMax + 1,
                        };
                    return item;
                })
                .sort((a: any, b: any) => a.order - b.order)
                .map((item: any, i: any) => {
                    return { ...item, order: i + 1 };
                });
            setData((d: any) => {
                return { ...d, [oldStatus]: temp };
            });

            return;
        }
        // CASE 1 ENDS HERE

        // CASE 2: Drag across multiple lists
        let tempGaveList = data[oldStatus]
            .filter((item: any) => item.id !== id)
            .sort((a: any, b: any) => a.order - b.order)
            .map((item: any, i: any) => {
                return { ...item, order: i + 1 };
            });

        let tempRecievedList = [
            ...data[newStatus],
            {
                ...dropCard,
                order: targetCard ? targetCard.order - 1 : newListOrderValueMax + 1,
            },
        ]
            .sort((a, b) => a.order - b.order)
            .map((item, i) => {
                return { ...item, order: i + 1 };
            });

        // At last, set state
        setData((d: any) => {
            return { ...d, [oldStatus]: tempGaveList, [newStatus]: tempRecievedList };
        });

        // CASE 2 ENDS HERE
    };
    return (
        <main className="app-board">
            {/* Board */}
            <section className="board-body">
                <div className="wrap-lists">
                    {lists.map((l: any) => (
                        <Board
                            data={data[l.status]}
                            key={l.status}
                            title={l.title}
                            status={l.status}
                            style={l.style}
                            onChange={cardChangeHandler}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default BoardList;