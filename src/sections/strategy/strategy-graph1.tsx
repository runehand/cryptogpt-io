import { m } from 'framer-motion';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import {
    Star,
    TrendingUp,
    Tag as Hash,
    AccessTime as Clock,
    BarChart as BarChart2,
    ShowChart as Activity,
    OpenInFull as Maximize2,
    AttachMoney as DollarSign
} from '@mui/icons-material';

import { useBoolean } from 'src/hooks/use-boolean';

// Define TypeScript interfaces
interface Color {
    CYAN_NEON: string;
    GOLD_NEON: string;
    WHITE: string;
    BLACK: string;
    RED: string;
    GREEN: string;
    PURPLE: string;
    ORANGE: string;
    BLUE: string;
}


interface NodePosition {
    x: number;
    y: number;
}

interface NodeType {
    id: string;
    type: string;
    text: string;
    color: string;
    position: NodePosition;
    finalPosition: NodePosition;
    profit?: number;
}

interface EdgeType {
    from: string;
    to: string;
    label: string;
    color: string;
}

const COLORS: Color = {
    CYAN_NEON: '#00FFFF',
    GOLD_NEON: '#FFD700',
    WHITE: '#FFFFFF',
    BLACK: '#1C1C1E',
    RED: '#FF3B30',
    GREEN: '#34C759',
    PURPLE: '#AF52DE',
    ORANGE: '#FF9500',
    BLUE: '#007AFF',
};

const glassMorphStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

const NodeIcon: React.FC<{ type: string; size: number; color: string }> = ({ type, size, color }) => {
    const icons: { [key: string]: React.ElementType } = {
        concept: Hash,
        strategy: TrendingUp,
        timeframe: Clock,
        asset: DollarSign,
        indicator: BarChart2,
        market: Activity,
        default: Star
    };
    const IconComponent = icons[type] || icons.default;
    return <IconComponent style={{ fontSize: size, color }} />;
};

const Node: React.FC<NodeType & {
    size: number;
    onClick: (id: string) => void;
    onAction: (id: string, action: string) => void;
    onDrag: (id: string, x: number, y: number) => void;
    onDragEnd: (id: string, x: number, y: number) => void;
}> = ({ id, position, color, size, text, type, onClick, onAction, onDrag, onDragEnd, profit, finalPosition }) => {

    const handleDrag = (event: MouseEvent, info: { offset: { x: number; y: number } }) => {
        onDrag(id, position.x + info.offset.x, position.y + info.offset.y);
    };

    const handleDragEnd = (event: MouseEvent, info: { offset: { x: number; y: number } }) => {
        onDragEnd(id, position.x + info.offset.x, position.y + info.offset.y);
    }

    return (
        <m.div
            drag
            dragConstraints={{ left: 0, right: window.innerWidth - size, top: 0, bottom: window.innerHeight - size }}
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: type === 'concept' ? '15px' : '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: COLORS.WHITE,
                ...glassMorphStyle,
                background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                border: `1px solid ${color}60`,
                boxShadow: `0 0 15px ${color}80, inset 0 0 10px ${color}40`,
            }}
            initial={{ x: position.x, y: position.y }}
            animate={{ x: position.x, y: position.y }}
            whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${color}, inset 0 0 15px ${color}60` }}
            onClick={() => onClick(id)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            <NodeIcon type={type} size={size * 0.3} color={COLORS.WHITE} />
            <div style={{ fontSize: size * 0.12, fontWeight: 'bold', textAlign: 'center', padding: '5px' }}>{text}</div>
            {profit !== undefined && (
                <div style={{
                    fontSize: size * 0.1,
                    fontWeight: 'bold',
                    color: profit >= 0 ? COLORS.GREEN : COLORS.RED
                }}>
                    {profit >= 0 ? '+' : ''}{profit}%
                </div>
            )}
            <div style={{ position: 'absolute', bottom: 5, right: 5 }}>
                <Maximize2 style={{ fontSize: size * 0.15 }} onClick={(e) => { e.stopPropagation(); onAction(id, 'expand'); }} />
            </div>
        </m.div>
    )
};

const Edge: React.FC<{ startX: number; startY: number; endX: number; endY: number; color: string; label: string }> =
    ({ startX, startY, endX, endY, color, label }) => (
        <>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.2 }} />
                        <stop offset="50%" style={{ stopColor: color, stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.2 }} />
                    </linearGradient>
                </defs>
                <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={`url(#grad-${color})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ transition: 'all 5s ease 0s' }}
                />
            </svg>
            {label && (
                <div style={{
                    position: 'absolute',
                    left: (startX + endX) / 2,
                    top: (startY + endY) / 2,
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color,
                    padding: '2px 5px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    boxShadow: `0 0 10px ${color}`,
                }}>
                    {label}
                </div>
            )}
        </>
    );

const StrategyGraph1: React.FC = () => {
    const [nodes, setNodes] = useState<NodeType[]>([
        { id: 'trading', type: 'concept', text: 'Crypto Trading', color: COLORS.CYAN_NEON, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'btc', type: 'asset', text: 'Bitcoin', color: COLORS.GOLD_NEON, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'eth', type: 'asset', text: 'Ethereum', color: COLORS.PURPLE, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'ada', type: 'asset', text: 'Cardano', color: COLORS.BLUE, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'trend', type: 'strategy', text: 'Trend Following', color: COLORS.GREEN, profit: 15.2, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'scalp', type: 'strategy', text: 'Scalping', color: COLORS.RED, profit: 8.7, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'swing', type: 'strategy', text: 'Swing Trading', color: COLORS.ORANGE, profit: 12.5, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'daily', type: 'timeframe', text: 'Daily', color: COLORS.WHITE, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'hourly', type: 'timeframe', text: '1H', color: COLORS.WHITE, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: '15min', type: 'timeframe', text: '15min', color: COLORS.WHITE, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'ma', type: 'indicator', text: 'Moving Average', color: COLORS.CYAN_NEON, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'rsi', type: 'indicator', text: 'RSI', color: COLORS.PURPLE, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'bull', type: 'market', text: 'Bull Market', color: COLORS.GREEN, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
        { id: 'bear', type: 'market', text: 'Bear Market', color: COLORS.RED, position: { x: 0, y: 0 }, finalPosition: { x: 0, y: 0 } },
    ]);

    const [edges, setEdges] = useState<EdgeType[]>([
        { from: 'trading', to: 'btc', label: 'involves', color: COLORS.GOLD_NEON },
        { from: 'trading', to: 'eth', label: 'involves', color: COLORS.PURPLE },
        { from: 'trading', to: 'ada', label: 'involves', color: COLORS.BLUE },
        { from: 'trading', to: 'trend', label: 'uses', color: COLORS.GREEN },
        { from: 'trading', to: 'scalp', label: 'uses', color: COLORS.RED },
        { from: 'trading', to: 'swing', label: 'uses', color: COLORS.ORANGE },
        { from: 'trend', to: 'btc', label: 'applied to', color: COLORS.GOLD_NEON },
        { from: 'scalp', to: 'eth', label: 'applied to', color: COLORS.PURPLE },
        { from: 'swing', to: 'ada', label: 'applied to', color: COLORS.BLUE },
        { from: 'trend', to: 'daily', label: 'uses', color: COLORS.WHITE },
        { from: 'scalp', to: '15min', label: 'uses', color: COLORS.WHITE },
        { from: 'swing', to: 'hourly', label: 'uses', color: COLORS.WHITE },
        { from: 'trend', to: 'ma', label: 'uses', color: COLORS.CYAN_NEON },
        { from: 'scalp', to: 'rsi', label: 'uses', color: COLORS.PURPLE },
        { from: 'bull', to: 'trend', label: 'favors', color: COLORS.GREEN },
        { from: 'bear', to: 'scalp', label: 'challenges', color: COLORS.RED },
        { from: 'ma', to: 'rsi', label: 'complements', color: COLORS.WHITE },
    ]);
    const resetFlag = useBoolean(false);

    const windowSize = useMemo(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800
    }), []);

    const graphSize = Math.min(windowSize.width, windowSize.height) * 0.5;
    const nodeSize = graphSize * 0.24;

    useEffect(() => {
        const positions: { [key: string]: NodePosition } = {};
        const centerX = graphSize / 2;
        const centerY = graphSize / 2;
        const radius = graphSize * 0.5;

        // Position the 'trading' node at the center
        // positions.trading = { x: centerX - nodeSize / 2, y: centerY - nodeSize / 2 };
        nodes[0].position = { x: centerX - nodeSize / 2, y: centerY - nodeSize / 2 };
        nodes[0].finalPosition = { x: centerX - nodeSize / 2, y: centerY - nodeSize / 2 };

        // Position other nodes in a circle around the center
        // const otherNodes = nodes.filter(node => node.id !== 'trading');
        // otherNodes.forEach((node, index) => {
        //     const angle = (index / otherNodes.length) * 2 * Math.PI;
        //     positions[node.id] = {
        //         x: centerX + Math.cos(angle) * radius - nodeSize / 2,
        //         y: centerY + Math.sin(angle) * radius - nodeSize / 2
        //     };
        // });

        // return positions;

        const otherNodes = nodes.slice(1);
        otherNodes.forEach((node, index) => {
            const angle = (index / otherNodes.length) * 2 * Math.PI;
            node.position = {
                x: centerX + Math.cos(angle) * radius - nodeSize / 2,
                y: centerY + Math.sin(angle) * radius - nodeSize / 2
            };
            node.finalPosition = {
                x: centerX + Math.cos(angle) * radius - nodeSize / 2,
                y: centerY + Math.sin(angle) * radius - nodeSize / 2
            };
        });

        setNodes([...nodes]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphSize, nodeSize, resetFlag.value]);

    const handleNodeClick = useCallback((nodeId: string) => {
        console.log(`Node clicked: ${nodeId}`);
        if (nodeId === 'trading') {
            resetFlag.onToggle();
        }
    }, [resetFlag]);

    const handleNodeAction = useCallback((nodeId: string, action: string) => {
        console.log(`Action ${action} on node: ${nodeId}`);
    }, []);

    const handleNodeDrag = useCallback((id: string, x: number, y: number) => {
        console.log(`handleNodeDrag --- Node ${id} dragged to x: ${x}, y: ${y}`);
        setNodes(prevNodes => prevNodes.map(node =>
            node.id === id ? { ...node, finalPosition: { x, y } } : node
        ));
    }, []);
    const handleNodeDragEnd = useCallback((id: string, x: number, y: number) => {
        handleNodeDrag(id, x, y);
        console.log(`handleNodeDragEnd --- Node ${id} dragged to x: ${x}, y: ${y}`);
        setNodes(prevNodes => prevNodes.map(node =>
            node.id === id ? { ...node, position: { x, y } } : node
        ));
    }, [handleNodeDrag]);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            // overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div
                ref={containerRef}
                style={{
                    width: graphSize,
                    height: graphSize,
                    position: 'relative',
                    overflow: 'visible',
                }}>
                {edges.map(({ from, to, label, color }, index) => {
                    const fromNode = nodes.find(n => n.id === from);
                    const toNode = nodes.find(n => n.id === to);
                    if (fromNode && toNode) {
                        return (
                            <Edge
                                key={`edge-${index}`}
                                startX={fromNode.finalPosition.x + nodeSize / 2}
                                startY={fromNode.finalPosition.y + nodeSize / 2}
                                endX={toNode.finalPosition.x + nodeSize / 2}
                                endY={toNode.finalPosition.y + nodeSize / 2}
                                color={color}
                                label={label}
                            />
                        );
                    }
                    return null;
                })}
                {nodes.map(node => (
                    <Node
                        key={node.id}
                        {...node}
                        size={nodeSize}
                        onClick={handleNodeClick}
                        onAction={handleNodeAction}
                        onDrag={handleNodeDrag}
                        onDragEnd={handleNodeDragEnd}
                    />
                ))}
            </div>
        </div>
    );
};

export default StrategyGraph1;