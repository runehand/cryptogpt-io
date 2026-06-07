import { Mesh, Object3D } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useMemo, useEffect } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

interface StrategyCoinModelProps {
    rotationSpeed?: number;
    name?: string;
    [key: string]: any; // For additional props
}

export default function StrategyCoinModel({ rotationSpeed = 0.005, name = "Tether", ...props }: StrategyCoinModelProps) {
    const meshRef = useRef<Mesh>(null);
    const fbx = useLoader(FBXLoader, '/models/Crypto-coins.fbx');

    const coinMesh = useMemo(() => {
        if (fbx) {
            const coinObject = fbx.children.find((child: Object3D) => child.name === name);
            if (coinObject && coinObject instanceof Mesh) {
                const clonedCoin = coinObject.clone();
                clonedCoin.position.set(0, 0, 0); // Reset the position
                clonedCoin.rotation.set(0, 0, 0); // Reset the rotation
                return clonedCoin;
            }
        }
        return null;
    }, [fbx, name]);

    useEffect(() => {
        if (coinMesh && meshRef.current) {
            meshRef.current.add(coinMesh);
        }

        return () => {
            if (coinMesh && meshRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                meshRef.current.remove(coinMesh);
            }
        };
    }, [coinMesh, meshRef]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.z += rotationSpeed;
        }
    });

    return (
        <mesh ref={meshRef} {...props} />
    );
}

// Preload assets
useLoader.preload(FBXLoader, '/models/Crypto-coins.fbx');