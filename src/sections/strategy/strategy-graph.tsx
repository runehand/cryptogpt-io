import { m, AnimatePresence } from 'framer-motion';
import React, { useMemo, useState, useCallback } from 'react';

import { SvgIcon } from '@mui/material';
import {
    Add as AddIcon,
    Star as StarIcon,
    Close as CloseIcon,
    Build as BuildIcon,
    Settings as SettingsIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

// Define color constants
const COLORS = {
    CYAN_NEON: '#00FFFF',
    GOLD_NEON: '#FFD700',
    WHITE: '#FFFFFF',
    BLACK: '#1C1C1E',
    RED: '#FF3B30',
    GREEN: '#34C759',
    PURPLE: '#AF52DE',
};


// Define types
type NodeType = 'strategy' | 'tool' | 'central';

interface NodeData {
    id: string;
    type: NodeType;
    text: string;
    color: string;
    content: string;
    stats?: {
        label: string;
        value: number;
        unit: string;
    };
}

interface NodeProps extends NodeData {
    x: number;
    y: number;
    size: number;
    onClick: (id: string) => void;
    onAction: (id: string, action: string) => void;
}

interface AddButtonProps {
    x: number;
    y: number;
    size: number;
    onClick: () => void;
}

interface ConnectionProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
}

interface PopupProps {
    node: NodeData;
    onClose: () => void;
}

// Styles
const glassMorphStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

// Components
const NodeIcon: React.FC<{ type: NodeType; size: number; color: string }> = ({ type, size, color }) => {
    const icons: Record<NodeType | 'default', typeof SvgIcon> = {
        strategy: TrendingUpIcon,
        tool: BuildIcon,
        central: SettingsIcon,
        default: StarIcon
    };
    const IconComponent = icons[type] || icons.default;
    return <IconComponent style={{ fontSize: size, color }} />;
};

const Node: React.FC<NodeProps> = ({ id, x, y, color, size, text, type, onClick, content, stats, onAction }) => (
    <m.div
        drag
        dragConstraints={{ left: 0, right: window.innerWidth - size, top: 0, bottom: window.innerHeight - size }}
        style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: COLORS.WHITE,
            fontFamily: "'Roboto Mono', monospace",
            ...glassMorphStyle,
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            border: `1px solid ${color}80`,
            boxShadow: `0 8px 32px 0 ${color}40`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, x, y }}
        whileHover={{ scale: 1.1, boxShadow: `0 8px 32px 0 ${color}80` }}
        onClick={() => onClick(id)}
    >
        <NodeIcon type={type} size={size * 0.2} color={COLORS.WHITE} />
        <div style={{ fontSize: size * 0.12, fontWeight: 'bold' }}>{text}</div>
        <div style={{ fontSize: size * 0.1 }}>{content}</div>
        {stats && (
            <div style={{ fontSize: size * 0.1, color: stats.value >= 0 ? COLORS.GREEN : COLORS.RED }}>
                {stats.label}: {stats.value >= 0 ? '+' : ''}{stats.value}{stats.unit}
            </div>
        )}
        <div style={{ position: 'absolute', bottom: 5, left: 5, right: 5, display: 'flex', justifyContent: 'space-between' }}>
            <SettingsIcon style={{ fontSize: size * 0.15 }} onClick={(e) => { e.stopPropagation(); onAction(id, 'settings'); }} />
            <AddIcon style={{ fontSize: size * 0.15 }} onClick={(e) => { e.stopPropagation(); onAction(id, 'maximize'); }} />
        </div>
    </m.div>
);

const AddButton: React.FC<AddButtonProps> = ({ x, y, size, onClick }) => (
    <m.div
        style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            ...glassMorphStyle,
            background: `linear-gradient(135deg, ${COLORS.CYAN_NEON}40, ${COLORS.CYAN_NEON}20)`,
            border: `1px solid ${COLORS.CYAN_NEON}80`,
            boxShadow: `0 8px 32px 0 ${COLORS.CYAN_NEON}40`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, x, y }}
        whileHover={{ scale: 1.1, boxShadow: `0 8px 32px 0 ${COLORS.CYAN_NEON}80` }}
        onClick={onClick}
    >
        <AddIcon style={{ fontSize: size * 0.6, color: COLORS.WHITE }} />
    </m.div>
);

const Connection: React.FC<ConnectionProps> = ({ startX, startY, endX, endY, color }) => (
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
        />
    </svg>
);

const Popup: React.FC<PopupProps> = ({ node, onClose }) => (
    <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            padding: '20px',
            borderRadius: '15px',
            backgroundColor: COLORS.BLACK,
            color: COLORS.WHITE,
            ...glassMorphStyle,
            zIndex: 1000,
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2>{node.text}</h2>
            <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
        <p>{node.content}</p>
        {node.type === 'strategy' && node.stats && (
            <div>
                <p>Success Rate: {node.stats.value}%</p>
                <p>Profit: ${node.stats.value.toFixed(2)}</p>
            </div>
        )}
        {node.type === 'tool' && node.stats && (
            <div>
                <p>Usage: {node.stats.value} times</p>
                <p>Efficiency Boost: {node.stats.value}%</p>
            </div>
        )}
    </m.div>
);

const CryptoStrategyKnowledgeGraph: React.FC = () => {
    const [nodes, setNodes] = useState<NodeData[]>([
        { id: 'central', type: 'central', text: 'HUB', color: COLORS.CYAN_NEON, content: 'Central Hub' },
        { id: 'strategy1', type: 'strategy', text: 'BTC Trend', color: COLORS.GOLD_NEON, content: 'Daily, 4H', stats: { label: 'Profit', value: 1250.75, unit: '$' } },
        { id: 'strategy2', type: 'strategy', text: 'ETH Scalp', color: COLORS.PURPLE, content: '5m, 15m', stats: { label: 'Profit', value: 890.20, unit: '$' } },
        { id: 'tool1', type: 'tool', text: 'Risk Calculator', color: COLORS.GREEN, content: 'Position Sizing', stats: { label: 'Usage', value: 152, unit: '' } },
        { id: 'tool2', type: 'tool', text: 'Market Scanner', color: COLORS.RED, content: 'Opportunity Finder', stats: { label: 'Alerts', value: 37, unit: '' } },
    ]);

    const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

    const windowSize = useMemo(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800
    }), []);

    // const gameSize = Math.min(windowSize.width, windowSize.height) * 0.8;
    const gameSize = Math.min(windowSize.width, windowSize.height) * 0.8;
    const nodeSize = gameSize * 0.2;

    const nodePositions = useMemo(() => {
        const positions: Record<string, { x: number; y: number }> = {};
        const centerX = gameSize / 2;
        const centerY = gameSize / 2;
        const radius = gameSize * 0.35;

        nodes.forEach((node, index) => {
            if (node.id === 'central') {
                positions[node.id] = { x: centerX - nodeSize / 2, y: centerY - nodeSize / 2 };
            } else {
                const angle = ((index - 1) / (nodes.length - 1)) * 2 * Math.PI;
                positions[node.id] = {
                    x: centerX + Math.cos(angle) * radius - nodeSize / 2,
                    y: centerY + Math.sin(angle) * radius - nodeSize / 2,
                };
            }
        });
        return positions;
    }, [nodes, gameSize, nodeSize]);

    const connections = useMemo(() => {
        const result: any[] = [];
        const centralPosition = nodePositions.central;

        for (let i = 1; i < nodes.length; i += 1) {
            const nodePosition = nodePositions[nodes[i].id];
            result.push({
                start: centralPosition,
                end: nodePosition,
                color: nodes[i].color,
            });
        }

        return result;
    }, [nodes, nodePositions]);

    const handleNodeClick = useCallback((nodeId: string) => {
        setSelectedNode(nodes.find(node => node.id === nodeId) || null);
    }, [nodes]);

    const handleNodeAction = useCallback((nodeId: string, action: string) => {
        console.log(`Action ${action} on node: ${nodeId}`);
    }, []);

    const handleAddNode = useCallback(() => {
        const newNode: NodeData = {
            id: `node${nodes.length + 1}`,
            type: Math.random() > 0.5 ? 'strategy' : 'tool',
            text: `New ${Math.random() > 0.5 ? 'Strategy' : 'Tool'} ${nodes.length}`,
            color: COLORS[Object.keys(COLORS)[Math.floor(Math.random() * Object.keys(COLORS).length)] as keyof typeof COLORS],
            content: 'New Content',
            stats: { label: 'Value', value: Math.floor(Math.random() * 100), unit: '' },
        };
        setNodes(prev => [...prev, newNode]);
    }, [nodes]);

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.BLACK, overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: gameSize, height: gameSize, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {connections.map(({ start, end, color }, index) => (
                    <Connection
                        key={`connection-${index}`}
                        startX={start.x + nodeSize / 2}
                        startY={start.y + nodeSize / 2}
                        endX={end.x + nodeSize / 2}
                        endY={end.y + nodeSize / 2}
                        color={color}
                    />
                ))}
                {nodes.map(node => (
                    <Node
                        key={node.id}
                        {...node}
                        x={nodePositions[node.id].x}
                        y={nodePositions[node.id].y}
                        size={nodeSize}
                        onClick={handleNodeClick}
                        onAction={handleNodeAction}
                    />
                ))}
                <AddButton
                    x={gameSize / 2 - nodeSize / 4}
                    y={gameSize / 2 - nodeSize / 4}
                    size={nodeSize / 2}
                    onClick={handleAddNode}
                />
            </div>
            <AnimatePresence>
                {selectedNode && (
                    <Popup
                        node={selectedNode}
                        onClose={() => setSelectedNode(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CryptoStrategyKnowledgeGraph;