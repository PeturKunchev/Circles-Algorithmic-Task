function round(input) {
    const data = input.trim().split(/\s+/);
    let idx = 0;
    
    const n = Number(data[idx++]);
    const circles = [];

    for (let i = 0; i < n; i++) {
        const x = Number(data[idx++]);
        const y = Number(data[idx++]);
        const r = Number(data[idx++]);
        circles.push({ x, y, r }); 
    }

    function intersectTwoPoints(c1,c2) {
        const dx = c1.x - c2.x;
        const dy = c1.y - c2.y;
        const d2 = dx * dx + dy * dy;

        const rSum = c1.r + c2.r;
        const rDiff = Math.abs(c1.r - c2.r);

        return (rDiff * rDiff < d2) && (d2 < rSum * rSum);
    }

    const graph = Array.from({length: n}, () =>[]);

    for (let i = 0; i < n; i++) {
         for (let j = i + 1; j < n; j++) {
            if (intersectTwoPoints(circles[i], circles[j])) {
                graph[i].push(j);
                graph[j].push(i);
            }
         }
    }

    const dist = Array(n).fill(-1);
    const queue = [];

    dist[0] = 0;
    queue.push(0);

    while (queue.length > 0) {
        const v = queue.shift();
        if (v===n-1) {
            break;
        }

        for (const next of graph[v]) {
            if (dist[next] === -1) {
                dist[next] = dist[v] + 1;
                queue.push(next);
            }
        }
    }
    
    return dist[n-1];
}
const input = `
3
0 0 1
4 0 4
1 0 2
`;

console.log(round(input));