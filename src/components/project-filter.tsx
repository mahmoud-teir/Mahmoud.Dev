"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectFilterProps = {
    technologies: string[];
    selectedTech: string | null;
    onFilterChange: (tech: string | null) => void;
};

export function ProjectFilter({ technologies, selectedTech, onFilterChange }: ProjectFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <Button
                variant={selectedTech === null ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange(null)}
            >
                All
            </Button>
            {technologies.map((tech) => (
                <Button
                    key={tech}
                    variant={selectedTech === tech ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFilterChange(tech)}
                >
                    {tech}
                </Button>
            ))}
        </div>
    );
}
