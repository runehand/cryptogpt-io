/* eslint-disable react/no-unknown-property */

"use client";

import { Group } from 'three';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { randInt } from 'three/src/math/MathUtils';
import { useRef, useState, useEffect } from 'react';
import { Html, useGLTF, useAnimations } from '@react-three/drei';

import { teachers, useAITeacher } from 'src/store/strategy/useAITeacher';

const ANIMATION_FADE_TIME = 0.5;

// Define an interface for the props if needed
interface TeacherProps {
    teacher: string;
    [key: string]: any; // For additional props
}

export default function StrategyTeacher({ teacher, ...props }: TeacherProps) {
    const groupRef = useRef<Group<any> | null>(null);
    // const { scene } = useGLTF(`/models/Teacher_${teacher}.glb`);
    const { scene } = useGLTF(`/models/crgptgirl.glb`);
    useEffect(() => {
        // scene.traverse((child: any) => {
        //     if (child.material) {
        //         child.material = new MeshStandardMaterial({
        //             map: child.material.map,
        //         });
        //     }
        // });
    }, [scene]);

    const currentMessage = useAITeacher((state) => state.currentMessage);
    const loading = useAITeacher((state) => state.loading);
    const { animations } = useGLTF(`/models/animations_${teacher}.glb`);
    const { actions, mixer } = useAnimations(animations, groupRef);
    const [animation, setAnimation] = useState('Idle');

    const [blink, setBlink] = useState(false);

    useEffect(() => {
        let blinkTimeout: any;
        const nextBlink = () => {
            blinkTimeout = setTimeout(
                () => {
                    setBlink(true);
                    setTimeout(() => {
                        setBlink(false);
                        nextBlink();
                    }, 100);
                },
                randInt(1000, 5000)
            );
        };
        nextBlink();
        return () => clearTimeout(blinkTimeout);
    }, []);

    useEffect(() => {
        if (loading) {
            setAnimation('Thinking');
        } else if (currentMessage) {
            setAnimation(randInt(0, 1) ? 'Talking' : 'Talking2');
        } else {
            setAnimation('Idle');
        }
    }, [currentMessage, loading]);

    useFrame(({ camera }) => {
        // Smile
        lerpMorphTarget('mouthSmile', 0.2, 0.5);
        // Blinking
        lerpMorphTarget('eye_close', blink ? 1 : 0, 0.5);

        // Talking
        for (let i = 0; i <= 21; i += 1) {
            lerpMorphTarget(String(i), 0, 0.1); // reset morph targets
        }

        if (currentMessage && currentMessage.visemes && currentMessage.audioPlayer) {
            for (let i = currentMessage.visemes.length - 1; i >= 0; i -= 1) {
                const viseme = currentMessage.visemes[i];
                if (currentMessage.audioPlayer.currentTime * 1000 >= viseme[0]) {
                    lerpMorphTarget(viseme[1], 1, 0.2);
                    break;
                }
            }

            const action = actions[animation];
            if (action && action.time > action.getClip().duration - ANIMATION_FADE_TIME) {
                setAnimation((_animation: any) => (_animation === 'Talking' ? 'Talking2' : 'Talking')); // Could load more type of animations and randomization here
            }
        }
    });

    useEffect(() => {
        actions[animation]
            ?.reset()
            .fadeIn(mixer.time > 0 ? ANIMATION_FADE_TIME : 0)
            .play();
        return () => {
            actions[animation]?.fadeOut(ANIMATION_FADE_TIME);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animation, actions]);

    const lerpMorphTarget = (target: string, value: number, speed: number = 0.1) => {
        scene.traverse((object: THREE.Object3D) => {
            const child = object as THREE.SkinnedMesh;
            if (
                child.isSkinnedMesh &&
                child.morphTargetDictionary &&
                child.morphTargetInfluences // Check if morphTargetInfluences is defined
            ) {
                const index = child.morphTargetDictionary[target];
                if (index === undefined || child.morphTargetInfluences[index] === undefined) {
                    return;
                }
                // Now it's safe to access child.morphTargetInfluences[index]
                child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
                    child.morphTargetInfluences[index],
                    value,
                    speed
                );
            }
        });
    };

    const [thinkingText, setThinkingText] = useState('.');

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setThinkingText((currentThinkingText) => {
                    if (currentThinkingText.length === 3) {
                        return '.';
                    }
                    return `${currentThinkingText}.`; // Also, updated to use template literals for string concatenation
                });
            }, 500);
            return () => clearInterval(interval);
        }
        return () => { };
    }, [loading]); // Removed thinkingText from the dependency array

    return (
        <group {...props} ref={groupRef}>
            {loading && (
                <Html position-y={teacher === 'Nanami' ? 1.6 : 1.8}>
                    <div className="flex justify-center items-center -translate-x-1/2">
                        <span className="relative flex h-8 w-8 items-center justify-center">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex items-center justify-center duration-75 rounded-full h-8 w-8 bg-white/80">
                                {thinkingText}
                            </span>
                        </span>
                    </div>
                </Html>
            )}
            <primitive object={scene} />
        </group>
    );
}

// Assuming "teachers" is typed elsewhere or is an array of strings
teachers.forEach((teacher: string) => {
    useGLTF.preload(`/models/Teacher_${teacher}.glb`);
    useGLTF.preload(`/models/animations_${teacher}.glb`);
});
