import { createContext, useContext, useState, ReactNode } from 'react';

export interface GestureState {
    gesture: 'none' | 'open' | 'pinch' | 'point' | 'fist' | 'thumbsUp' | 'peace' | 'click' | 'grab' | 'scroll';
    position: { x: number; y: number };
    confidence: number;
}

interface GestureContextType {
    isEnabled: boolean;
    toggleGestureMode: () => void;
    gestureState: GestureState;
    setGestureState: (state: GestureState) => void;
    isInteracting: boolean;
    setIsInteracting: (isInteracting: boolean) => void;
    cursorPosition: { x: number; y: number };
    setCursorPosition: (position: { x: number; y: number }) => void;
}

const GestureContext = createContext<GestureContextType | undefined>(undefined);

export const GestureProvider = ({ children }: { children: ReactNode }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0.5, y: 0.5 });
    const [gestureState, setGestureState] = useState<GestureState>({
        gesture: 'none',
        position: { x: 0, y: 0 },
        confidence: 0
    });

    const toggleGestureMode = () => {
        setIsEnabled((prev) => !prev);
    };

    return (
        <GestureContext.Provider value={{
            isEnabled,
            toggleGestureMode,
            gestureState,
            setGestureState,
            isInteracting,
            setIsInteracting,
            cursorPosition,
            setCursorPosition
        }}>
            {children}
        </GestureContext.Provider>
    );
};

export const useGesture = () => {
    const context = useContext(GestureContext);
    if (context === undefined) {
        throw new Error('useGesture must be used within a GestureProvider');
    }
    return context;
};
